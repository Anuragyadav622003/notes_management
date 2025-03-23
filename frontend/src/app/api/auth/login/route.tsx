import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email === "test@example.com" && password === "password123") {
      return NextResponse.json({ message: "Login successful", token: "your-jwt-token" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
