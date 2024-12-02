"use client";

import { AboutAesu } from "~/components/shared/about-aesu";
import { FAQ } from "~/components/shared/faq-section";
import HeroBanner from "~/components/shared/hero-banner";
import { Events } from "~/components/shared/events-section";

export default function Home() {
  return (
    <section className="bg-[#1f2122]">
      <HeroBanner />
      <Events />
      <AboutAesu />
      <FAQ />
    </section>
  );
}
