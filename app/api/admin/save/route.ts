import { NextResponse } from "next/server";
import { commitJson } from "@/lib/github";
import type { AdminData } from "@/lib/types";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as AdminData | null;
  if (!body || !Array.isArray(body.properties) || !body.settings || !Array.isArray(body.services) || !Array.isArray(body.blogPosts)) return NextResponse.json({ error: "Invalid site data." }, { status: 400 });
  try { await Promise.all([commitJson("data/properties.json", body.properties, "Update TDS properties"), commitJson("data/settings.json", body.settings, "Update TDS site settings"), commitJson("data/services.json", body.services, "Update TDS services"), commitJson("data/blog.json", body.blogPosts, "Update TDS insights")]); return NextResponse.json({ ok: true, message: "Published — Vercel will redeploy shortly." }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not publish changes." }, { status: 500 }); }
}
