"use client";
import React from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Journey from "@/src/components/Journey";
import MedusaApp from "@/src/MedusaApp";
import { Product } from "@medusajs/medusa";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import ShopNow from "@/src/components/Shop/ShopNow";
import ReadyToWear from "@/src/components/Shop/ReadyToWear";
import Testimonials from "@/src/components/Testimonials";

export default function Wrapper({ hero, shopCTAs, testimonials }) {
  return (
    <MedusaApp>
      <div>
        <Header />
        <Hero data={hero} />

        <div className="layout">
          <div className="mt-36">
            <Journey />
          </div>
        </div>

        <section className="mt-36">
          <ProductsHighlight />
        </section>

        <section className="mt-36">
          <ReadyToWear />

          {shopCTAs.map((cta, idx) => (
            <ShopNow key={idx} data={cta} />
          ))}
        </section>

        <section className="mt-36">
          <Testimonials testimonials={testimonials} />
        </section>

        <Footer />
      </div>
    </MedusaApp>
  );
}
