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
import { useSearchStore } from "@/src/state/search";
import ProductsPreviewHighlight from "@/src/components/Products/ProductsPreviewHighlight";
import { MOBILE_BREAKPOINT, useMediaQuery } from "@/utils/hooks/useStyleWidthQuery";

export default function Wrapper({ hero, shopCTAs, testimonials }) {
  const store = useSearchStore();
  const isSmall = useMediaQuery(MOBILE_BREAKPOINT)

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
            <ProductsPreviewHighlight
              collectionKey="pcol_01J77YW8NCQZTYCTHXWM7GPJRY"
              title="Aso Oke Collections"
              itemsPerPage={isSmall ? 2 : 6}
              itemsType="COLLECTIONS"
              slug="/shop-aso-oke"
            />
          </section>

          <section className="mt-14 lg:mt-36">
            <ProductsPreviewHighlight
              slug="/ready-to-wear"
              title="Ready To Wear Collections"
              showPrice
              itemsType="PRODUCTS"
              itemsPerPage={isSmall ? 4 : 12}
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
