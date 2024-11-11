"use client";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import ProductCard from "../ui/cards/ProductCard";
import Button from "../ui/button";
import Link from "next/link";
import { useProductStore } from "@/src/state/product";
import ProductFilterPane from "../Product/ProductFilterPane";

import { m, LazyMotion, AnimatePresence } from "framer-motion";
import loadFeatures from "@/src/framer/load-features";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import SkeletonLoader from "../loaders/SkeletonLoader";
import {
  MOBILE_BREAKPOINT,
  useMediaQuery,
} from "@/utils/hooks/useStyleWidthQuery";

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
  const {
    isFilterPaneVisible,
    status,
    products,
    queryProducts,
    productsCount,
  } = useProductStore();
  const [pageCount, setProductPage] = useState(0);

  useEffect(() => {
    if (collectionKey) {
      queryProducts({
        collectionId: collectionKey,
        limit: itemsPerPage,
        page: pageCount,
      });
    }
  }, [collectionKey, pageCount]);

  const pathName = usePathname();
  const isSmall = useMediaQuery(MOBILE_BREAKPOINT);

  return (
    <div>
      <div className="layout ">
        <h1 className="text-[20px] text-brown-dark-2100 lg:text-[40px]">
          {title}
        </h1>
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
              <m.div>
                <ProductFilterPane
                  collectionKey={collectionKey}
                  itemsPerPage={itemsPerPage}
                  filters={filters}
                />
              </m.div>
            )}
          </AnimatePresence>

          <div className={cn("mt-9 lg:mt-14", filters ? "ml-0 lg:ml-12" : "")}>
            {status === "LOADING" ? (
              <ul className="grid grid-cols-9 gap-8 lg:grid-cols-10">
                {Array(isSmall ? 6 : 12)
                  .fill("")
                  .map((_, index) => (
                    <li key={index}>
                      <SkeletonLoader />
                    </li>
                  ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-9 lg:grid-cols-10">
                {products?.map((product) => (
                  <li className="" key={product.id}>
                    <ProductCard {...{ product, showPrice, itemsType }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </LazyMotion>

      {pathName === "/" ? (
        <div className="flex w-full justify-center mt-9 lg:mt-20">
          <Link href={slug || ""}>
            <Button title="Browse All" />
          </Link>
        </div>
      ) : (
        <div className="layout">
          <div className="flex justify-end mt-9 lg:mt-20">
            <div className="flex flex-row">
              <div className="flex items-center mr-4">
                <p className="text-sm text-brown-dark-1500">
                  Showing {products?.length} of {productsCount} Items
                </p>
              </div>

              <div className="flex flex-row">
                <div
                  onClick={() =>
                    setProductPage((page) => (page - 1 < 0 ? page : page - 1))
                  }
                  className="mr-2 flex hover:cursor-pointer items-center"
                >
                  <FaChevronLeft size={19} />
                </div>

                <ul className="flex flex-row items-center gap-3">
                  {productsCount &&
                    itemsPerPage &&
                    new Array(Math.round(productsCount / (itemsPerPage || 0)))
                      .fill("")
                      .map((_, index) => (
                        <li key={index}>
                          <div
                            onClick={() => setProductPage(index)}
                            className={cn(
                              "h-6 w-6 rounded-xl flex items-center justify-center text-sm hover:cursor-pointer",
                              pageCount === index
                                ? "bg-[#181615]"
                                : "bg-transparent"
                            )}
                          >
                            <p
                              className={cn(
                                pageCount === index
                                  ? "text-white"
                                  : "text-brown-1500"
                              )}
                            >
                              {index + 1}
                            </p>
                          </div>
                        </li>
                      ))}
                </ul>

                <div
                  onClick={() =>
                    setProductPage((page) =>
                      page + 1 > Math.round(productsCount / (itemsPerPage || 0))
                        ? page
                        : page + 1
                    )
                  }
                  className="ml-2 flex hover:cursor-pointer items-center"
                >
                  <FaChevronRight size={19} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
