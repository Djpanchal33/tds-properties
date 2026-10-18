"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const tags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags || []))].sort(), [posts]);
  const [selectedTag, setSelectedTag] = useState("");
  const visible = selectedTag ? posts.filter((post) => post.tags?.includes(selectedTag)) : posts;
  return <>
    <div className="mb-10 flex flex-wrap gap-2"><button onClick={() => setSelectedTag("")} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${!selectedTag ? "border-navy bg-navy text-cream" : "border-navy/20 text-navy hover:border-gold"}`}>All insights</button>{tags.map((tag) => <button key={tag} onClick={() => setSelectedTag(tag)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${selectedTag === tag ? "border-navy bg-navy text-cream" : "border-navy/20 text-navy hover:border-gold"}`}>{tag}</button>)}</div>
    {visible.length ? <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{visible.map((post) => <article key={post.slug} className="group overflow-hidden bg-white shadow-card"><Link href={`/blog/${post.slug}`}><img src={post.image} alt="" className="aspect-[1.4] w-full object-cover transition duration-700 group-hover:scale-105"/><div className="p-6"><p className="eyebrow">{post.category} · {post.readTime}</p><h2 className="display mt-3 text-4xl leading-[.92] text-navy">{post.title}</h2><p className="mt-4 text-sm leading-6 text-navy/65">{post.excerpt}</p><div className="mt-5 flex flex-wrap gap-2">{post.tags?.map((tag) => <span key={tag} className="rounded-full bg-navy/5 px-2.5 py-1 text-[.65rem] font-bold text-navy/60">{tag}</span>)}</div><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">Read article <ArrowUpRight size={16}/></span></div></Link></article>)}</div> : <div className="border border-dashed border-navy/25 px-6 py-14 text-center text-navy/65">No insights use this tag yet.</div>}
  </>;
}
