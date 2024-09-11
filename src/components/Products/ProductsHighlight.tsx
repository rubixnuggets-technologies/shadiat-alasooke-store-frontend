"use client";
import React, { useState } from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import Image from "next/image";
import { useProducts } from "medusa-react";
import cn from "classnames";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";

interface ProductsHighlightProps {
  itemsPerPage?: number;
  title?: string;
  showPrice?: boolean;
  collectionKey?: string;
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
                <div className="border-2 border-black">
                  <div className="w-full relative h-[390px]">
                    <Image
                      alt={product?.title || "alasooke"}
                      fill
                      loader={MedusaImageLoader}
                      className="absolute object-cover"
                      src={product?.thumbnail || "    "}
                    />

                    <div className="flex justify-center hover:cursor-pointer">
                      <div className="h-6 w-6 absolute bottom-4 z-5 rounded-full bg-white flex items-center justify-center">
                        <TfiPlus size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 pl-7 pr-2 pb-12 flex flex-row justify-between ">
                    <div>
                      <p className="text-base uppercase">{product.title}</p>

                      {showPrice && <p className="text-base">N1000</p>}
                    </div>

                    <div>
                      <LiaBookmark size={22} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* <p>{JSON.stringify(products)}</p> */}
        </div>
      </div>
    </div>
  );
}
