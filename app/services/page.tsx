import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, FileText, Landmark, KeyRound } from "lucide-react";
import { getServices, getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = { title: "Property services", description: "Buying, selling, renting, commercial advisory, financial coordination and document readiness with TDS Properties." };
export const dynamic = "force-dynamic";

const icons = [KeyRound, Building2, Landmark, FileText];

export default async function ServicesPage() {
  const [{ settings }, services] = await Promise.all([getSiteData(), getServices()]);
  return <><Header settings={settings} transparent /><main id="main">
    <section className="bg-navy pb-20 pt-32 text-cream md:pb-24 md:pt-40"><div className="wrap max-w-5xl"><p className="eyebrow">How we help</p><h1 className="display mt-5 text-balance text-6xl leading-[.84] md:text-8xl">Property decisions, made more considered.</h1><p className="mt-7 max-w-2xl text-base leading-7 text-white/70">From a first shortlist to document readiness, TDS brings the important conversations into focus.</p></div></section>
    <section className="bg-cream py-16 md:py-24"><div className="wrap grid gap-6 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => { const Icon = icons[index % icons.length]; return <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-h-[22rem] flex-col justify-between overflow-hidden bg-white p-7 shadow-card transition hover:-translate-y-1"><div><Icon size={25} className="text-gold"/><p className="eyebrow mt-8">{service.eyebrow}</p><h2 className="display mt-3 text-4xl leading-[.9] text-navy">{service.title}</h2><p className="mt-5 text-sm leading-6 text-navy/65">{service.summary}</p></div><span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-gold">Learn more <ArrowUpRight size={16} /></span></Link>; })}</div></section>
  </main><Footer settings={settings}/></>;
}
