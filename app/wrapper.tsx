"use client";
import React, { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Journey from "@/src/components/Journey";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import ShopNow from "@/src/components/Shop/ShopNow";
import ReadyToWear from "@/src/components/Shop/ReadyToWear";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Testimonials from "@/src/components/Testimonials";
import { useSearchStore } from "@/src/state/store";

export default function Wrapper({ hero, shopCTAs, testimonials }) {
  const store = useSearchStore();

  return (
    <div>
      <Header />

      {store?.searchItems && store?.isOpen ? (
        <SearchResultsView />
      ) : (
        <div>
          <Hero data={hero} />

          <div className="layout">
            <div className="mt-14 lg:mt-36">
              <Journey />
            </div>
          </div>

          <section className="mt-14 lg:mt-36">
            <ProductsHighlight
              collectionKey="pcol_01J77YW8NCQZTYCTHXWM7GPJRY"
              title="Aso Oke Collections"
              itemsPerPage={6}
              itemsType="COLLECTIONS"
              slug="/explore/shop-aso-oke"
            />
          </section>

          <section className="mt-14 lg:mt-36">
            <ProductsHighlight
              slug="/explore/shop-rtw"
              title="Ready To Wear Collections"
              showPrice
              itemsType="PRODUCTS"
              itemsPerPage={12}
              collectionKey="pcol_01J77Z78T528S0FFDJCREQ6ZBA"
            />
          </section>

          <section className="mt-14 lg:mt-36">
            <ReadyToWear />

            {shopCTAs.map((cta, idx) => (
              <ShopNow key={idx} data={cta} />
            ))}
          </section>

          <section className="mt-14 lg:mt-36">
            <Testimonials testimonials={testimonials} />
          </section>
        </div>
      )}

      <Footer />
    </div>
  );
}
