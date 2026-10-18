import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
export async function POST(request: Request) {
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file supplied." }, { status: 400 });
  const isImage = file.type.startsWith("image/");
  const isVideo = ["video/mp4", "video/webm"].includes(file.type);
  if (!isImage && !isVideo) return NextResponse.json({ error: "Use an image, MP4, or WebM file." }, { status: 400 });
  const limit = isVideo ? 30_000_000 : 8_000_000;
  if (file.size > limit) return NextResponse.json({ error: isVideo ? "Use a video smaller than 30MB." : "Use an image smaller than 8MB." }, { status: 400 });
  try { const blob = await put(`tds/${crypto.randomUUID()}-${file.name}`, file, { access: "public" }); return NextResponse.json({ url: blob.url }); }
  catch { return NextResponse.json({ error: "Vercel Blob is not configured." }, { status: 500 }); }
}
