"use client";

import Header from "~/components/Layout/Header";
import HeroBanner from "./_components/hero-banner";
import { Projects } from "./_components/projects";
import { AboutAesu } from "./_components/about-aesu";
import { FAQ } from "./_components/faq-section";
import { Footer } from "~/components/Layout/Footer";

export default function Home() {
  return (
    <section className="bg-[#1f2122]">
      <Header />
      <HeroBanner />
      <Projects />
      <AboutAesu />
      <FAQ />
      <Footer />
    </section>
  );
}
