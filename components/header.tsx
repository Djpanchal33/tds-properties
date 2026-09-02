"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import type { Settings } from "@/lib/types";

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

export function Brand({ light = false }: { name: string; light?: boolean }) {
  return (
    <span className={`inline-flex flex-col leading-none ${light ? "text-cream" : "text-navy"}`}>
      <b className="display text-[1.85rem] font-semibold tracking-[-.12em]">TDS</b>
      <span className="mt-1 text-[.45rem] font-bold tracking-[.28em]">PROPERTIES</span>
    </span>
  );
}

function FloatingWhatsApp({ number }: { number: string }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent("Hi TDS Properties, I’d like to know more about your properties.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with TDS Properties on WhatsApp"
      className="fixed bottom-20 right-5 z-[60] inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,.32)] transition hover:-translate-y-1 hover:bg-[#1ebe5d] focus-visible:outline-white lg:bottom-6 lg:right-6"
    >
      <MessageCircle size={22} fill="currentColor" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}

export default function Header({ settings, transparent = false }: { settings: Settings; transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [raised, setRaised] = useState(!transparent);
  useMotionValueEvent(scrollY, "change", (value) => setRaised(value > 40 || !transparent));

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${raised ? "bg-cream/95 text-navy shadow-sm backdrop-blur" : "text-cream"}`}>
        <div className="wrap flex h-20 items-center justify-between">
          <Link href="/" aria-label="TDS Properties home"><Brand name={settings.logoText} light={!raised} /></Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
            {links.map((link) => <Link className="text-sm font-medium transition hover:text-gold" href={link.href} key={link.href}>{link.label}</Link>)}
            <Link href="/contact" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#e3b85c]">Start a conversation</Link>
          </nav>
          <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center md:hidden"><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 94% 5%)" }} animate={{ clipPath: "circle(150% at 94% 5%)" }} exit={{ clipPath: "circle(0% at 94% 5%)" }} transition={{ duration: .6, ease: [0.76, 0, .24, 1] }} className="fixed inset-0 z-[80] bg-navy px-6 pt-6 text-cream">
            <div className="flex items-start justify-between">
              <Link onClick={() => setOpen(false)} href="/"><Brand name={settings.logoText} light /></Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center"><X /></button>
            </div>
            <nav className="mt-20 flex flex-col" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .15 + index * .08 }} key={link.href}>
                  <Link onClick={() => setOpen(false)} href={link.href} className="display flex items-center justify-between border-b border-white/15 py-6 text-5xl">{link.label}<ArrowUpRight className="h-7 w-7 text-gold" /></Link>
                </motion.div>
              ))}
            </nav>
            <a href={`https://wa.me/${settings.contact.whatsapp}`} target="_blank" rel="noreferrer" className="absolute bottom-10 left-6 text-sm font-semibold text-gold">WhatsApp us →</a>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingWhatsApp number={settings.contact.whatsapp} />
    </>
  );
}
