import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getService, getServices, getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const service = await getService((await params).slug); return service ? { title: service.title, description: service.summary } : {}; }
export async function generateStaticParams() { return (await getServices()).map((service) => ({ slug: service.slug })); }

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getService((await params).slug); if (!service) notFound(); const { settings } = await getSiteData();
  return <><Header settings={settings} transparent/><main id="main"><section className="relative isolate overflow-hidden bg-navy pt-28 text-cream md:pt-36"><img src={service.heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/25"/><div className="wrap max-w-5xl py-20 md:py-28"><p className="eyebrow">{service.eyebrow}</p><h1 className="display mt-5 max-w-4xl text-balance text-6xl leading-[.84] md:text-8xl">{service.title}</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/75">{service.summary}</p></div></section><section className="bg-cream py-16 md:py-24"><div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]"><article className="max-w-2xl space-y-6 text-base leading-8 text-navy/75">{service.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article><aside className="bg-white p-7 shadow-card"><p className="eyebrow">What we can help with</p><ul className="mt-5 space-y-4">{service.highlights.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-navy"><Check size={17} className="mt-1 shrink-0 text-gold"/>{item}</li>)}</ul><Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="mt-8 inline-flex items-center gap-2 bg-navy px-5 py-3 text-sm font-bold text-cream">{service.cta}<ArrowRight size={16}/></Link></aside></div></section></main><Footer settings={settings}/></>;
}
