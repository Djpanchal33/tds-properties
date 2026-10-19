import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Brand } from "@/components/header";
import type { Settings } from "@/lib/types";

export default function Footer({ settings }: { settings: Settings }) {
  const social = [
    { label: "Instagram", href: settings.social.instagram, Icon: Instagram },
    { label: "Facebook", href: settings.social.facebook, Icon: Facebook },
    { label: "LinkedIn", href: settings.social.linkedin, Icon: Linkedin },
  ].filter((item) => Boolean(item.href));
  return <footer className="bg-ink py-14 text-cream"><div className="wrap"><div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 xl:grid-cols-[1.4fr_.8fr_.9fr_.9fr]"><div><Brand name={settings.logoText} onDark /><p className="mt-5 max-w-sm text-sm leading-6 text-white/60">Exceptional homes, land and workplaces, selected with care across Ahmedabad and Gandhinagar.</p>{social.length > 0 && <div className="mt-6 flex gap-3">{social.map(({ label, href, Icon }) => <a key={label} href={href!} target="_blank" rel="noreferrer" aria-label={`TDS Properties on ${label}`} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-cream transition hover:border-gold hover:bg-gold hover:text-ink"><Icon size={17}/></a>)}</div>}</div><div><p className="eyebrow">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm"><Link href="/properties">Properties</Link><Link href="/services">Services</Link><Link href="/blog">Insights</Link><Link href="/about">Our story</Link></div></div><div><p className="eyebrow">Support</p><div className="mt-4 flex flex-col gap-3 text-sm"><Link href="/services/financial-services">Financial coordination</Link><Link href="/legal-documents">Legal documents</Link><Link href="/contact">Contact</Link></div></div><div><p className="eyebrow">Visit us</p><address className="mt-4 max-w-[16rem] text-sm not-italic leading-6 text-white/70">{settings.contact.address}</address><a className="mt-3 block text-sm text-gold" href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a></div></div><div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between"><span>{settings.footerText}</span><span>RERA compliant · Privacy</span></div></div></footer>;
}
