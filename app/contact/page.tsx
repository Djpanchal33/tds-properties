import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getSiteData } from "@/lib/data";
import EnquiryForm from "@/components/enquiry-form";
export const metadata: Metadata = { title: "Contact" };
export default async function Contact() { const {settings} = await getSiteData(); return <><Header settings={settings}/><main id="main" className="pt-20"><section className="bg-navy py-24 text-cream"><div className="wrap"><p className="eyebrow">Contact us</p><h1 className="display mt-4 max-w-4xl text-6xl leading-[.84] md:text-8xl">Let’s talk about what’s next.</h1></div></section><section className="wrap grid gap-14 py-20 lg:grid-cols-[.85fr_1.15fr]"><div><p className="display text-4xl text-navy">Come by, call, or leave us a note.</p><div className="mt-10 space-y-6 text-sm text-navy/70"><p className="flex gap-3"><MapPin className="shrink-0 text-gold" size={19}/><span>{settings.contact.address}</span></p><p className="flex gap-3"><Phone className="shrink-0 text-gold" size={19}/><a href={`tel:${settings.contact.phone}`}>{settings.contact.phone}</a></p><p className="flex gap-3"><Mail className="shrink-0 text-gold" size={19}/><a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a></p></div></div><EnquiryForm compact/></section><iframe title="TDS Properties office location" src={settings.contact.mapUrl} className="h-[28rem] w-full border-0 grayscale" loading="lazy"/></main><Footer settings={settings}/></>; }
