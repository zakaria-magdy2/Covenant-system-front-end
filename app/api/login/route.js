import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "http://invtrackapi.runasp.net/api/Authentication/LoginAdmin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("Login response data:", data);

    if (!response.ok || !data.isAuthenticated) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(data.expiration),
    });

    return NextResponse.json(
      { message: "Login successful", user: data.username, role: data.role },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
