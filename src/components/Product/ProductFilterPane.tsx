"use client";
import React, { useEffect, useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { useProductStore } from "@/src/state/product";
import cn from "classnames";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
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

const AnimatedChevron = ({
  filterTabs,
  activeFilter,
}: {
  filterTabs: string[];
  activeFilter: string;
}) => (
  <LazyMotion strict features={loadFeatures}>
    <m.div
      animate={{
        rotate: filterTabs.includes(activeFilter) ? 0 : "90deg",
      }}
    >
      <IoChevronDown size={22} />
    </m.div>
  </LazyMotion>
);

export default function ProductFilterPane({
  filters,
  collectionKey,
  itemsPerPage,
}: ProductsHighlightProps) {
  const [productTags, setProductTags] = useState<Array<string>>([]);

  const [activeFilterTab, setActiveFilterTab] = useState<Array<string>>([
    "by_product_filters",
    "by_color_filters",
    "by_new_arrivals_filters",
  ]);

  const { toggleFilterPane, queryProducts } = useProductStore();

  const applyProductTag = (tag: string) => {
    setProductTags((allTags) =>
      allTags.includes(tag)
        ? allTags.filter((productTag) => productTag !== tag)
        : [...allTags, tag]
    );
  };

  const toggleFilterTab = (filterTab: string) => {
    setActiveFilterTab((tab) =>
      activeFilterTab.includes(filterTab)
        ? tab.filter((tabItem) => filterTab !== tabItem)
        : [...tab, filterTab]
    );
  };

  useEffect(() => {
    queryProducts({
      filter: productTags,
      limit: itemsPerPage,
      collectionId: collectionKey,
    });
  }, [productTags]);

  return (
    <div className="hidden lg:flex flex-col w-fill border-r-2 h-full border-brown-light-1200 pl-12 pr-6 pt-8 ">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[40px]"> Filters </h1>
        </div>

        <div
          onClick={toggleFilterPane}
          className="h-9 w-9 rounded-full border-[1px] border-black flex items-center justify-center hover:cursor-pointer"
        >
          <AiFillCaretLeft size={22} />
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-12">
        {filters?.by_product_filters && (
          <div>
            <div
              onClick={() => toggleFilterTab("by_product_filters")}
              className="flex flex-row hover:cursor-pointer justify-between"
            >
              <h3 className="text-base text-brown-light-2100"> By Product </h3>

              <AnimatedChevron
                filterTabs={activeFilterTab}
                activeFilter="by_product_filters"
              />
            </div>

            <div>
              <LazyMotion strict features={loadFeatures}>
                <AnimatePresence>
                  {activeFilterTab.includes("by_product_filters") && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ul className="flex flex-wrap flex-row gap-4 mt-4">
                        {filters.by_product_filters.map((filter) => (
                          <li key={filter}>
                            <div
                              onClick={() => applyProductTag(filter)}
                              className={cn(
                                `h-9 px-4 hover:cursor-pointer  rounded-full flex items-center justify-center`,
                                productTags.includes(filter)
                                  ? "border-brown-dark-1500 border-[2.5px]"
                                  : "border-brown-light-1500 border-[1px]"
                              )}
                            >
                              <p className="text-brown-dark-1500">{filter}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </div>
        )}

        {filters?.by_color_filters && (
          <div>
            <div
              onClick={() => toggleFilterTab("by_color_filters")}
              className="flex flex-row hover:cursor-pointer justify-between"
            >
              <h3 className="text-base text-brown-light-2100"> By Color </h3>

              <AnimatedChevron
                filterTabs={activeFilterTab}
                activeFilter="by_color_filters"
              />
            </div>

            <div>
              <LazyMotion strict features={loadFeatures}>
                <AnimatePresence>
                  {activeFilterTab.includes("by_color_filters") && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ul className="flex flex-wrap flex-row gap-4 mt-4">
                        {filters.by_color_filters.map((filter) => (
                          <li key={filter}>
                            <div
                              onClick={() => applyProductTag(filter)}
                              className={cn(
                                `h-9 px-4 hover:cursor-pointer border-[1px] rounded-full flex items-center justify-center`,
                                productTags.includes(filter)
                                  ? "border-brown-dark-1500 border-[2.5px]"
                                  : "border-brown-light-1500 border-[1px]"
                              )}
                            >
                              <p className="text-brown-1500">{filter}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </div>
        )}

        {filters?.by_new_arrivals_filters && (
          <div>
            <div
              onClick={() => toggleFilterTab("by_new_arrivals_filters")}
              className="flex flex-row hover:cursor-pointer justify-between"
            >
              <h3 className="text-base text-brown-light-2100"> By New Arrivals </h3>

              <AnimatedChevron
                filterTabs={activeFilterTab}
                activeFilter="by_new_arrivals_filters"
              />
            </div>

            <div>
              <LazyMotion strict features={loadFeatures}>
                <AnimatePresence>
                  {activeFilterTab.includes("by_new_arrivals_filters") && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ul className="flex flex-wrap flex-row gap-4 mt-4">
                        {filters.by_new_arrivals_filters.map((filter) => (
                          <li key={filter}>
                            <div
                              onClick={() => applyProductTag(filter)}
                              className={cn(
                                `h-9 px-4 hover:cursor-pointer border-[1px] rounded-full flex items-center justify-center`,
                                productTags.includes(filter)
                                  ? "border-brown-dark-1500 border-[2.5px]"
                                  : "border-brown-light-1500 border-[1px]"
                              )}
                            >
                              <p className="text-brown-1500">{filter}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </div>
        )}

        {/* <div>
          <div className="flex flex-row hover:cursor-pointer justify-between">
            <h3 className="text-base text-brown-light-2100"> By Price </h3>

            <AnimatedChevron
              filterTabs={activeFilterTab}
              activeFilter="by_price_filter"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
