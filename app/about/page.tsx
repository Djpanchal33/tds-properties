import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getSiteData } from "@/lib/data";
import { ImageReveal, Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Our story",
  description: "Learn how TDS Properties brings local insight and thoughtful advice to every real-estate decision.",
};

const promises = [
  { title: "A considered edit", text: "We show fewer, better options — each one chosen against the way you want to live, work or invest." },
  { title: "Local, in the meaningful sense", text: "Our perspective comes from knowing the streets, the people and the quiet details that never fit on a listing." },
  { title: "Advice that stays useful", text: "We make the process clearer from first conversation to handover, with straight answers at every turn." },
];

export default async function About() {
  const { settings } = await getSiteData();

  return (
    <>
      <Header settings={settings} transparent />
      <main id="main">
        <section className="relative isolate flex min-h-[78dvh] items-end overflow-hidden bg-navy pt-24 text-cream">
          <img src={settings.about.image} alt="A considered TDS Properties residence" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a0f1a] via-[#0f2547]/70 to-[#0f2547]/25" />
          <div className="wrap grid gap-8 pb-14 md:pb-20 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
            <Reveal>
              <p className="eyebrow text-[#e3b85c]">Our story</p>
              <h1 className="display mt-5 max-w-5xl text-balance text-6xl leading-[.82] md:text-8xl">A property search should feel as considered as the life you’re building.</h1>
            </Reveal>
            <Reveal delay={.12} className="border-l border-gold pl-5 text-sm leading-6 text-white/75">
              TDS Properties is an independent real-estate advisory for Ahmedabad and Gandhinagar.
            </Reveal>
          </div>
        </section>

        <section className="wrap grid gap-12 py-24 lg:grid-cols-[.92fr_1.08fr] lg:items-center md:py-32">
          <ImageReveal src={settings.about.image} alt="TDS Properties interior" className="aspect-[.84] shadow-card" />
          <Reveal>
            <p className="eyebrow">TDS Properties</p>
            <div className="gold-rule mt-5" />
            <h2 className="display mt-7 text-balance text-5xl leading-[.88] text-navy md:text-7xl">{settings.about.heading}</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-navy/70">{settings.about.text}</p>
            <p className="mt-5 max-w-xl leading-7 text-navy/65">We care about the feeling behind the brief as much as the square footage: the early sun in a living room, a commute that gets lighter, land with room to grow, or a workplace that says the right thing before a meeting begins.</p>
            <Link href="/properties" className="mt-9 inline-flex items-center gap-3 border-b border-gold pb-2 text-sm font-bold text-navy transition hover:text-gold">Explore the collection <ArrowRight size={16} /></Link>
          </Reveal>
        </section>

        <section className="bg-navy py-20 text-cream md:py-24">
          <div className="wrap grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <Reveal>
              <p className="eyebrow">Our promise</p>
              <h2 className="display mt-4 text-5xl leading-[.86] md:text-6xl">Thoughtful from the first call.</h2>
            </Reveal>
            <div className="grid gap-px bg-white/15 md:grid-cols-3">
              {promises.map((promise, index) => (
                <Reveal delay={index * .08} key={promise.title} className="bg-navy p-6">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-gold"><Check size={16} /></span>
                  <h3 className="display mt-8 text-3xl">{promise.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{promise.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e8e4dc] py-20 md:py-28">
          <div className="wrap">
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><p className="eyebrow">By the numbers</p><h2 className="display mt-3 text-5xl leading-[.88] text-navy md:text-6xl">A quiet record of trust.</h2></div>
              <p className="max-w-sm text-sm leading-6 text-navy/65">Every number represents relationships earned slowly — and a decision made with confidence.</p>
            </Reveal>
            <div className="mt-10 grid gap-px bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
              {settings.stats.map((stat) => <div className="bg-cream p-6" key={stat.label}><p className="display text-5xl text-navy">{stat.value}<sup className="text-xl text-gold">+</sup></p><p className="mt-3 text-sm text-navy/60">{stat.label}</p></div>)}
            </div>
          </div>
        </section>

        <section className="wrap py-24 md:py-32">
          <Reveal><p className="eyebrow">The people behind the work</p><h2 className="display mt-4 max-w-3xl text-5xl leading-[.88] text-navy md:text-6xl">A connected team with a personal point of view.</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {settings.team.map((member, index) => (
              <Reveal delay={index * .08} key={member.name}>
                <article className="group overflow-hidden bg-[#e8e4dc]">
                  <div className="aspect-[.9] overflow-hidden"><img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-6"><h3 className="display text-4xl text-navy">{member.name}</h3><p className="mt-1 text-sm text-navy/60">{member.role}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
