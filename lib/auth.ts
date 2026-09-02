import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me");
export async function hash(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
export async function signToken(payload: JWTPayload, expiresIn: string) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(expiresIn).sign(secret());
}
export async function verifyToken(token: string) { return jwtVerify(token, secret()); }
export async function signChallenge(email: string, code: string) {
  return signToken({ emailHash: await hash(email.toLowerCase()), codeHash: await hash(`${code}${process.env.JWT_SECRET || "development-secret-change-me"}`) }, "10m");
}
export async function verifySession(token?: string) {
  if (!token) return false;
  try { const { payload } = await verifyToken(token); return payload.role === "admin"; } catch { return false; }
}
