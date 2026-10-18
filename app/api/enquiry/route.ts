import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: string; email?: string; phone?: string; purpose?: string; category?: string; budget?: string; message?: string; property?: string } | null;
  if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "TDS Properties <onboarding@resend.dev>";
  if (!apiKey || !process.env.ADMIN_EMAIL) return NextResponse.json({ error: "Email delivery is not configured yet." }, { status: 503 });
  try {
    const escape = (value?: string) => (value || "Not given").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to: process.env.ADMIN_EMAIL, replyTo: body.email, subject: `New enquiry${body.property ? ` — ${body.property}` : ""}`, html: `<h2>New TDS Properties enquiry</h2><p><b>Name:</b> ${escape(body.name)}</p><p><b>Email:</b> ${escape(body.email)}</p><p><b>Phone:</b> ${escape(body.phone)}</p><p><b>I want to:</b> ${escape(body.purpose)}</p><p><b>Category:</b> ${escape(body.category)}</p><p><b>Budget:</b> ${escape(body.budget)}</p><p><b>Property:</b> ${escape(body.property || "General")}</p><p><b>Message:</b><br/>${escape(body.message).replace(/\n/g, "<br/>")}</p>` });
    if (error) {
      console.error("Enquiry email not sent:", error.message);
      return NextResponse.json({ error: "We could not send that enquiry right now. Please try again shortly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email not sent:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "We could not send that enquiry right now. Please try again shortly." }, { status: 502 });
  }
}
