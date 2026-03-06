import { cookies } from "next/headers";

export async function GET(
  req: Request,
  context: { params: Promise<{ nationalNumber: string }> }
) {
  try {
    const { nationalNumber } = await context.params;

    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    const token = tokenCookie.value;

    const response = await fetch(
      `http://invtrackapi.runasp.net/api/Employee/GeneratEmployeeAssetPDF?NationalNumber=${nationalNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("PDF STATUS:", response.status);
      const text = await response.text();
      console.log("PDF BODY:", text);

      return new Response("External API Error", {
        status: response.status,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=Employee-${nationalNumber}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF SERVER ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}