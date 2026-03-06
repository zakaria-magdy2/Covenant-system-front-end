import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API called");

    const cookieStore = cookies(); // مش محتاج await
    const token = (await cookieStore).get("token")?.value;

    console.log("Token:", token);

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Employee/GetAllEmployee",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("External status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("External error body:", text);

      return NextResponse.json(
        { message: "External API error" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("ERROR INSIDE API:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
