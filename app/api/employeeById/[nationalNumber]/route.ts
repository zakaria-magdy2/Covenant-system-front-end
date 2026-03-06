import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* ===== Types القادمة من الـ API ===== */

type ApiEmployee = {
  name: string;
  building: string | null;
  phoneNumber: string;
  nationalNumber: string;
};

type ApiAsset = {
  name: string;
  quantity: number;
  transactionDate: string;
};

type ApiOperation = {
  name?: string;
  quantity?: number;
  transactionDate: string;
  transactionType: string;
};

export async function GET(
  req: Request,
  context: { params: Promise<{ nationalNumber: string }> },
) {
  try {
    // ✅ قراءة الرقم القومي
    const { nationalNumber } = await context.params;

    // ✅ قراءة التوكن
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const token = tokenCookie.value;

    const baseUrl = "http://invtrackapi.runasp.net/api/Employee";

    /* =======================================
       1️⃣ بيانات الموظف (إجباري)
    ======================================== */
    const empRes = await fetch(
      `${baseUrl}/GetEmployeeByNationalNumber?NationalNumber=${nationalNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!empRes.ok) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    const empData = (await empRes.json()) as ApiEmployee;

    /* =======================================
       2️⃣ العهد (اختياري)
    ======================================== */
    const assetsRes = await fetch(
      `${baseUrl}/GetAllAssetItemToEmployee?NationalNumber=${nationalNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const rawAssets = assetsRes.ok
      ? ((await assetsRes.json()) as ApiAsset[])
      : [];

    const assets = Array.isArray(rawAssets)
      ? rawAssets.map((a) => ({
          item: a.name,
          qty: a.quantity,
          lastTransfer: a.transactionDate,
        }))
      : [];

    /* =======================================
       3️⃣ العمليات (اختياري)
    ======================================== */
    const opsRes = await fetch(
      `${baseUrl}/GetEmployeeAssetHistory?NationalNumber=${nationalNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const rawOps = opsRes.ok ? await opsRes.json() : [];

    let operations: {
      type: string;
      item: string;
      qty: number;
      date: string;
    }[] = [];

    // لو رجعت Array
    if (Array.isArray(rawOps)) {
      operations = (rawOps as ApiOperation[]).map((o) => ({
        type: o.transactionType,
        item: o.name ?? "",
        qty: o.quantity ?? 0,
        date: o.transactionDate,
      }));
    }
    // لو رجعت Object واحد
    else if (rawOps && typeof rawOps === "object") {
      const single = rawOps as ApiOperation;

      operations = [
        {
          type: single.transactionType,
          item: single.name ?? "",
          qty: single.quantity ?? 0,
          date: single.transactionDate,
        },
      ];
    }

    /* =======================================
       رجوع البيانات للفرونت
    ======================================== */
    return NextResponse.json({
      id: nationalNumber,
      name: empData.name,
      building: empData.building,
      phone: empData.phoneNumber,
      nationalId: empData.nationalNumber,
      avatarUrl: "/icon/lucide_user-round.svg",
      assets,
      operations,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
