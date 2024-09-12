"use client";
import React, { useState } from "react";
import { useProducts } from "medusa-react";
import cn from "classnames";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import ProductCard from "../ui/cards/ProductCard";
import Button from "../ui/button";
import Link from "next/link";

interface ProductsHighlightProps {
  itemsPerPage?: number;
  title?: string;
  showPrice?: boolean;
  collectionKey?: string;
  slug?: string;
  filters?: {
    by_color_filters: string[];
    by_product_filters: string[];
    by_new_arrivals_filters: string[];
  };
}

export default function ProductsHighlight({
  itemsPerPage = 12,
  title,
  showPrice,
  collectionKey,
  filters,
  slug
}: ProductsHighlightProps) {
  const [filterControlOpen, openFilterControl] = useState(true);
  const [productTags, setProductTags] = useState<Array<string>>([]);

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
        <p className="text-[40px]">{title}</p>
      </div>

      <div
        className={cn(
          "grid",
          filterControlOpen && filters
            ? "grid-cols-[450px_auto]"
            : "grid-cols-[auto]"
        )}
      >
        {filterControlOpen && filters && (
          <div className="w-fill border-r-2 border-brown-1200 pl-12 pr-6 pt-8 ">
            <div className="flex flex-row justify-between">
              <div>
                <p className="text-4xl"> Filters </p>
              </div>

              <div
                onClick={() => openFilterControl(false)}
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

        <div className={cn("mt-14", filters ? "ml-12" : "")}>
          <ul className="grid grid-cols-10">
            {products?.map((product) => (
              <li key={product.id}>
                <ProductCard {...{ product, showPrice }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-20">
          <Link href={slug || ""}>
            <Button title="Browse All" />
          </Link>
        </div>
      </div>
    </div>
  );
}
