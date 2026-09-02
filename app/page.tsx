import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Hero, Intro, FeaturedGallery, MobileFeatured, PropertyTypes, Stats, WhyChooseUs, Testimonials, Marquee, FinalCta } from "@/components/home-sections";
import EnquiryForm from "@/components/enquiry-form";
export async function generateMetadata(): Promise<Metadata> { const { settings } = await getSiteData(); return { title: settings.seo.title, description: settings.seo.description, openGraph: { images: [settings.seo.ogImage] } }; }
export default async function Home() { const { properties, settings } = await getSiteData(); const published = properties.filter((p) => p.published); const featured = published.filter((p) => p.featured); return <><Header settings={settings} transparent/><main id="main"><Hero settings={settings}/><Intro settings={settings}/><FeaturedGallery properties={featured}/><MobileFeatured properties={featured}/><PropertyTypes settings={settings} properties={published}/><Stats settings={settings}/><WhyChooseUs/><Testimonials settings={settings}/><Marquee settings={settings}/><FinalCta settings={settings}/><section className="bg-cream py-24"><div className="wrap grid gap-10 lg:grid-cols-[1fr_.85fr]"><div><p className="eyebrow">Come say hello</p><h2 className="display mt-4 text-6xl leading-[.85] text-navy">A conversation is a good place to begin.</h2></div><EnquiryForm compact/></div></section></main><Footer settings={settings}/></>; }
