import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Building2, MapPin } from "lucide-react";
import { getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyFilters from "@/components/property-filters";

export const metadata: Metadata = {
  title: "Property collection",
  description: "Browse apartments, villas, plots, farmhouses and commercial spaces represented by TDS Properties.",
};
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const { properties, settings } = await getSiteData();
  const published = properties.filter((property) => property.published);
  const cities = [...new Set(published.map((property) => property.city))];

  return (
    <>
      <Header settings={settings} transparent />
      <main id="main">
        <section className="relative isolate overflow-hidden bg-navy pt-32 text-cream md:pt-40">
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(201,151,63,.28),transparent_55%)] lg:block" />
          <div className="wrap grid gap-14 pb-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <p className="eyebrow">The TDS collection</p>
              <h1 className="display mt-5 max-w-5xl text-balance text-6xl leading-[.82] md:text-8xl">Places chosen with purpose.</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/70">A selective collection of homes, land and workplaces across Ahmedabad and Gandhinagar — each with a distinct sense of possibility.</p>
            </div>
            <div className="border-l border-gold pl-5">
              <p className="display text-5xl text-gold">{published.length}</p>
              <p className="mt-2 text-sm text-white/65">current properties, personally represented by TDS.</p>
              <a href="#listings" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">Browse all listings <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <div className="border-t border-white/15">
            <div className="wrap flex gap-2 overflow-x-auto py-4">
              {settings.propertyTypes.map((type) => <Link href={`/properties?type=${encodeURIComponent(type)}#listings`} key={type} className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/75 transition hover:border-gold hover:bg-gold hover:text-ink">{type}</Link>)}
            </div>
          </div>
        </section>

        <section id="listings" className="scroll-mt-20 bg-cream py-16 md:py-20">
          <div className="wrap">
            <div className="grid gap-8 border-b border-navy/15 pb-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow">Find your place</p>
                <h2 className="display mt-3 text-5xl leading-[.88] text-navy md:text-6xl">Explore the collection.</h2>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/60">
                <span className="inline-flex items-center gap-2"><Building2 size={16} className="text-gold" />{settings.propertyTypes.length} property types</span>
                <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-gold" />{cities.join(" · ")}</span>
              </div>
            </div>
            <PropertyFilters properties={published} settings={settings} />
          </div>
        </section>

        <section className="bg-[#e8e4dc] py-14">
          <div className="wrap flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div><p className="eyebrow">Looking for something particular?</p><p className="display mt-2 text-3xl text-navy">We also source discreet, off-market opportunities.</p></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 bg-navy px-5 py-3 text-sm font-bold text-cream transition hover:bg-[#1b3a6b]">Tell us your brief <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
