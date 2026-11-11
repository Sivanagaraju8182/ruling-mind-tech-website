/**
 * app/page.tsx  -  THE HOME PAGE  (address: "/")
 * It is simply the sections stacked from top to bottom. To re-order, move a line.
 * (The header and footer come from layout.tsx.)
 */
import Hero from "@/components/home/Hero";
import Promises from "@/components/home/Promises";
import ServicesPreview from "@/components/home/ServicesPreview";
import CrownStairs from "@/components/home/CrownStairs";
import Principles from "@/components/home/Principles";
import TechStack from "@/components/home/TechStack";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promises />
      <ServicesPreview />
      <CrownStairs />
      <Principles />
      <TechStack />
      <CtaBanner />
    </>
  );
}
