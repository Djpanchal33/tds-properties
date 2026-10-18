import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPost, getBlogPosts, getSiteData } from "@/lib/data";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = await getBlogPost((await params).slug); return post ? { title: post.title, description: post.excerpt } : {}; }
export async function generateStaticParams() { return (await getBlogPosts()).map((post) => ({ slug: post.slug })); }
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) { const post = await getBlogPost((await params).slug); if (!post) notFound(); const { settings } = await getSiteData(); const date = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.publishedAt}T00:00:00`)); return <><Header settings={settings} transparent/><main id="main"><article><section className="bg-navy pb-16 pt-32 text-cream md:pt-40"><div className="wrap max-w-4xl"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold"><ArrowLeft size={16}/> All insights</Link><p className="eyebrow mt-10">{post.category} · {post.readTime}</p><h1 className="display mt-5 text-balance text-6xl leading-[.84] md:text-8xl">{post.title}</h1><p className="mt-7 max-w-2xl leading-7 text-white/70">{post.excerpt}</p></div></section><img src={post.image} alt="" className="mx-auto max-h-[38rem] w-full object-cover"/><section className="bg-cream py-16 md:py-24"><div className="wrap max-w-3xl"><p className="text-sm text-navy/50">Published {date}</p><div className="mt-8 space-y-7 text-lg leading-8 text-navy/75">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-12 border-t border-navy/15 pt-8"><Link href="/contact" className="inline-flex items-center gap-2 bg-navy px-5 py-3 text-sm font-bold text-cream">Talk to TDS about your plans <ArrowRight size={16}/></Link></div></div></section></article></main><Footer settings={settings}/></>; }
