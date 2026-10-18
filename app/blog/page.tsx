import type { Metadata } from "next";
import { getBlogPosts, getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BlogList from "@/components/blog-list";

export const metadata: Metadata = { title: "Property insights", description: "Guides and local perspectives for buying, selling, renting and choosing property in Ahmedabad and Gandhinagar." };
export const dynamic = "force-dynamic";
export default async function BlogPage() { const [{ settings }, posts] = await Promise.all([getSiteData(), getBlogPosts()]); return <><Header settings={settings} transparent/><main id="main"><section className="bg-navy pb-20 pt-32 text-cream md:pt-40"><div className="wrap max-w-5xl"><p className="eyebrow">TDS journal</p><h1 className="display mt-5 text-6xl leading-[.84] md:text-8xl">Better questions make better property decisions.</h1><p className="mt-7 max-w-2xl leading-7 text-white/70">Practical local guides for buyers, sellers, tenants and businesses.</p></div></section><section className="bg-cream py-16 md:py-24"><div className="wrap"><BlogList posts={posts}/></div></section></main><Footer settings={settings}/></>; }
