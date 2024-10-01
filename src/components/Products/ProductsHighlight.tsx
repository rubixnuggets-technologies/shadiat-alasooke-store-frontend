"use client";
import React, { useState } from "react";
import { useProducts } from "medusa-react";
import cn from "classnames";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import ProductCard from "../ui/cards/ProductCard";
import Button from "../ui/button";
import Link from "next/link";
import { useProductStore } from "@/src/state/product";

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
  const [productTags, setProductTags] = useState<Array<string>>([]);

  const { isFilterPaneVisible, toggleFilterPane } = useProductStore();

  const { products, isLoading, error } = useProducts({
    limit: itemsPerPage,
    collection_id: collectionKey ? [collectionKey || ""] : [],

    tags: productTags,
  });

  const applyProductTag = (tag: string) => {
    setProductTags((allTags) =>
      allTags.includes(tag)
        ? allTags.filter((productTag) => productTag !== tag)
        : [...allTags, tag]
    );
  };

  return (
    <div>
      <div className="layout ">
        <h1 className="text-[20px] text-brown-2100 lg:text-[40px]">{title}</h1>
      </div>

      <div
        className={cn(
          "grid",
          isFilterPaneVisible && filters
            ? "flex flex-col lg:grid-cols-[450px_auto]"
            : "grid-cols-[auto]"
        )}
      >
        {isFilterPaneVisible && filters && (
          <div className="hidden lg:flex flex-col w-fill border-r-2 border-brown-1200 pl-12 pr-6 pt-8 ">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-[40px]"> Filters </h1>
              </div>

              <div
                onClick={toggleFilterPane}
                className="h-9 w-9 rounded-full border-2 border-black flex items-center justify-center hover:cursor-pointer"
              >
                <AiFillCaretLeft size={22} />
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-12">
              {filters?.by_product_filters && (
                <div>
                  <div className="flex flex-row hover:cursor-pointer justify-between">
                    <p className="text-base"> By Product </p>

                    <div>
                      <IoChevronDown size={22} />
                    </div>
                  </div>

                  <div>
                    <ul className="flex flex-wrap flex-row gap-4 mt-4">
                      {filters.by_product_filters.map((filter) => (
                        <li key={filter}>
                          <div
                            onClick={() => applyProductTag(filter)}
                            className="h-9 px-4 hover:cursor-pointer border-2 border-brown-1200 rounded-full flex items-center justify-center"
                          >
                            <p className="text-brown-1500">{filter}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {filters?.by_color_filters && (
                <div>
                  <div className="flex flex-row hover:cursor-pointer justify-between">
                    <p className="text-base"> By Color </p>

                    <div>
                      <IoChevronDown size={22} />
                    </div>
                  </div>

                  <div>
                    <ul className="flex flex-wrap flex-row gap-4 mt-4">
                      {filters.by_color_filters.map((filter) => (
                        <li key={filter}>
                          <div
                            onClick={() => applyProductTag(filter)}
                            className="h-9 hover:cursor-pointer  px-4 border-2 border-brown-1200 rounded-full flex items-center justify-center"
                          >
                            <p className="text-brown-1500">{filter}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {filters?.by_new_arrivals_filters && (
                <div>
                  <div className="flex flex-row hover:cursor-pointer justify-between">
                    <p className="text-base"> By New Arrivals </p>

                    <div>
                      <IoChevronDown size={22} />
                    </div>
                  </div>

                  <div>
                    <ul className="flex flex-wrap flex-row gap-4 mt-4">
                      {filters.by_new_arrivals_filters.map((filter) => (
                        <li key={filter}>
                          <div
                            onClick={() => applyProductTag(filter)}
                            className="h-9 hover:cursor-pointer  px-4 border-2 border-brown-1200 rounded-full flex items-center justify-center"
                          >
                            <p className="text-brown-1500">{filter}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <div className="flex flex-row hover:cursor-pointer justify-between">
                  <p className="text-base"> By Price </p>

                  <div>
                    <IoChevronDown size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={cn("mt-9 lg:mt-14", filters ? "ml-0 lg:ml-12" : "")}>
          {/* <ul className="flex flex-row flex-wrap"> */}
          <ul className="grid grid-cols-2 lg:flex flex-row flex-wrap">
            {products?.map((product) => (
              <li className="" key={product.id}>
                <ProductCard {...{ product, showPrice, itemsType }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-9 lg:mt-20">
          <Link href={slug || ""}>
            <Button title="Browse All" />
          </Link>
        </div>
      </div>
    </div>
  );
}
