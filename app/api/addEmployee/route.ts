import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Employee/AddEmployee",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const text = await response.text(); // 👈 نقرأه كنص

    if (!response.ok) {
      console.log("AddEmployee STATUS:", response.status);
      console.log("AddEmployee BODY:", text);

      return NextResponse.json({ message: text }, { status: response.status });
    }

    console.log("AddEmployee SUCCESS:", text);

    return NextResponse.json({
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
