"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "medusa-react";
import cn from "classnames";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import ProductCard from "../ui/cards/ProductCard";
import Button from "../ui/button";
import Link from "next/link";
import { useProductStore } from "@/src/state/product";
import ProductFilterPane from "../Product/ProductFilterPane";

import { m, LazyMotion, AnimatePresence } from "framer-motion";
import loadFeatures from "@/src/framer/load-features";

interface ProductsHighlightProps {
  itemsPerPage?: number;
  title?: string;
  showPrice?: boolean;
  collectionKey?: string;
  slug?: string;
  itemsType?: "PRODUCTS" | "COLLECTIONS";
  filters?: {
    by_color_filters: string[];
    by_product_filters: string[];
    by_new_arrivals_filters: string[];
  };
}

export default function ProductsHighlight({
  itemsPerPage,
  title,
  showPrice,
  collectionKey,
  filters,
  slug,
  itemsType,
}: ProductsHighlightProps) {
  const { isFilterPaneVisible, products, queryProducts } = useProductStore();

  useEffect(() => {
    queryProducts([]);
  }, []);

  // {isFilterPaneVisible && filters && (
  //   <ProductFilterPane filters={filters} />
  // )}

  // <m.div
  //             initial={{  opacity: 0, height: 0 }}
  //             animate={{ opacity: 1, height: "auto" }}
  //             exit={{ opacity: 0, height: 0 }}
  //           >
  //             <ProductFilterPane filters={filters} />
  //           </m.div>

  return (
    <div>
      <div className="layout ">
        <h1 className="text-[20px] text-brown-2100 lg:text-[40px]">{title}</h1>
      </div>

      <LazyMotion strict features={loadFeatures}>
        <div
          className={cn(
            "grid",
            isFilterPaneVisible && filters
              ? "flex flex-col lg:grid-cols-[450px_auto]"
              : "grid-cols-[auto]"
          )}
        >
          <AnimatePresence>
            {isFilterPaneVisible && filters && (
              <m.div
                initial={{ width: "auto", opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <ProductFilterPane filters={filters} />
              </m.div>
            )}
          </AnimatePresence>

          <div className={cn("mt-9 lg:mt-14", filters ? "ml-0 lg:ml-12" : "")}>
            <ul className="grid grid-cols-2 lg:flex flex-row flex-wrap">
              {products?.map((product) => (
                <li className="" key={product.id}>
                  <ProductCard {...{ product, showPrice, itemsType }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LazyMotion>

      <div className="flex w-full justify-center mt-9 lg:mt-20">
        <Link href={slug || ""}>
          <Button title="Browse All" />
        </Link>
      </div>
    </div>
  );
}
