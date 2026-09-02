import { NextResponse } from "next/server";
import { Resend } from "resend";
import { signChallenge, signToken, verifyToken } from "@/lib/auth";

const secure = process.env.NODE_ENV === "production";
export async function POST(request: Request) {
  const { email = "" } = await request.json().catch(() => ({}));
  const response = NextResponse.json({ message: "If this address is authorised, a verification code has been sent." });
  const cookie = request.headers.get("cookie")?.match(/otp_rate=([^;]+)/)?.[1];
  let count = 0;
  try { count = Number((await verifyToken(cookie || "")).payload.count || 0); } catch { /* fresh rate window */ }
  if (count >= 5) return response;
  response.cookies.set("otp_rate", await signToken({ count: count + 1 }, "15m"), { httpOnly: true, secure, sameSite: "strict", maxAge: 900, path: "/" });
  if (!process.env.ADMIN_EMAIL || email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) return response;
  const code = String(Math.floor(100000 + Math.random() * 900000));
  response.cookies.set("otp_challenge", await signChallenge(email, code), { httpOnly: true, secure, sameSite: "strict", maxAge: 600, path: "/" });
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: "TDS Properties <onboarding@resend.dev>", to: email, subject: `${code} is your TDS Properties code`, html: `<div style="font-family:Arial;background:#0F2547;padding:40px;color:#F7F5F2"><p style="letter-spacing:2px;color:#C9973F">TDS PROPERTIES</p><h1>Your verification code</h1><p style="font-size:32px;letter-spacing:8px;font-weight:bold">${code}</p><p>This code expires in 10 minutes. If you did not request it, you can safely ignore this email.</p></div>` });
  }
  return response;
}
