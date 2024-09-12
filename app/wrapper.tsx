"use client";
import React from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Journey from "@/src/components/Journey";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import ShopNow from "@/src/components/Shop/ShopNow";
import ReadyToWear from "@/src/components/Shop/ReadyToWear";
import Testimonials from "@/src/components/Testimonials";

export default function Wrapper({ hero, shopCTAs, testimonials }) {
  return (
    <div>
      <div>
        <Header />
        <Hero data={hero} />

        <div className="layout">
          <div className="mt-36">
            <Journey />
          </div>
        </div>

        <section className="mt-36">
          <ProductsHighlight
            collectionKey="pcol_01J77YW8NCQZTYCTHXWM7GPJRY"
            title="Aso Oke Collections"
            itemsPerPage={6}
            showPrice
            slug="/explore/shop-aso-oke"
          />
        </section>

        <section className="mt-36">
          <ProductsHighlight
            slug="/explore/shop-rtw"
            title="Ready To Wear Collections"
            showPrice
            collectionKey="pcol_01J77Z78T528S0FFDJCREQ6ZBA"
          />
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
    </div>
  );
}
