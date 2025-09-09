import React from "react";
import Hero from "../components/home/hero";
import CardSection from "../components/home/cardsection";
import PricingPlan from "../components/home/pricing";

export default async function Home() {
  return (
    <div>
      <Hero />
      <CardSection />
      <PricingPlan />
    </div>
  );
}
