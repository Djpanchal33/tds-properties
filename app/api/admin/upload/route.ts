import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
export async function POST(request: Request) {
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file supplied." }, { status: 400 });
  if (!file.type.startsWith("image/") || file.size > 8_000_000) return NextResponse.json({ error: "Use an image smaller than 8MB." }, { status: 400 });
  try { const blob = await put(`tds/${crypto.randomUUID()}-${file.name}`, file, { access: "public" }); return NextResponse.json({ url: blob.url }); }
  catch { return NextResponse.json({ error: "Vercel Blob is not configured." }, { status: 500 }); }
}
