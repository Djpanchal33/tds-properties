import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: string; email?: string; phone?: string; message?: string; property?: string } | null;
  if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return NextResponse.json({ ok: true, note: "Email delivery is not configured yet." });
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: "TDS Properties <onboarding@resend.dev>", to: process.env.ADMIN_EMAIL, replyTo: body.email, subject: `New enquiry${body.property ? ` — ${body.property}` : ""}`, html: `<h2>New TDS Properties enquiry</h2><p><b>Name:</b> ${body.name}</p><p><b>Email:</b> ${body.email}</p><p><b>Phone:</b> ${body.phone || "Not given"}</p><p><b>Property:</b> ${body.property || "General"}</p><p><b>Message:</b><br/>${body.message.replace(/\n/g, "<br/>")}</p>` });
  return NextResponse.json({ ok: true });
}
