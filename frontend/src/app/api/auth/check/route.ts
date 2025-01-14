import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get("Authentication");

  if (!authCookie) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const decoded = jwtDecode<JWTPayload>(authCookie.value);
    return NextResponse.json({
      id: decoded.sub,
      email: decoded.email,
    });
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
}
