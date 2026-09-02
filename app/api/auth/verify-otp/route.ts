import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { hash, signToken, verifyToken } from "@/lib/auth";

const secure = process.env.NODE_ENV === "production";
export async function POST(request: Request) {
  const { code = "" } = await request.json().catch(() => ({}));
  const cookies = request.headers.get("cookie") || "";
  const challenge = cookies.match(/otp_challenge=([^;]+)/)?.[1];
  const attemptsToken = cookies.match(/otp_attempts=([^;]+)/)?.[1];
  let attempts = 0;
  try { attempts = Number((await verifyToken(attemptsToken || "")).payload.count || 0); } catch { /* no attempts */ }
  const response = NextResponse.json({ error: "That code is invalid or has expired." }, { status: 401 });
  if (attempts >= 5 || !challenge) return response;
  try {
    const { payload } = await verifyToken(challenge);
    const wanted = String(payload.codeHash || "");
    const submitted = await hash(`${code}${process.env.JWT_SECRET || "development-secret-change-me"}`);
    const valid = wanted.length === submitted.length && timingSafeEqual(Buffer.from(wanted), Buffer.from(submitted));
    if (!valid) { response.cookies.set("otp_attempts", await signToken({ count: attempts + 1 }, "10m"), { httpOnly: true, secure, sameSite: "strict", maxAge: 600, path: "/" }); return response; }
    const success = NextResponse.json({ ok: true });
    success.cookies.set("tds_session", await signToken({ role: "admin", emailHash: payload.emailHash }, "7d"), { httpOnly: true, secure, sameSite: "strict", maxAge: 604800, path: "/" });
    success.cookies.set("otp_challenge", "", { httpOnly: true, secure, sameSite: "strict", maxAge: 0, path: "/" });
    success.cookies.set("otp_attempts", "", { httpOnly: true, secure, sameSite: "strict", maxAge: 0, path: "/" });
    return success;
  } catch { return response; }
}
