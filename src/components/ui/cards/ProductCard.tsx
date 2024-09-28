"use client";
import React, { useState } from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import { truncateText } from "@/utils/helpers/text";

import Link from "next/link";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useSearchStore } from "@/src/state/store";

export default function ProductCard({ product, showPrice, itemsType }: any) {
  const [bookmarked, setBookmamrk] = useState(false);
  const { resetSearch } = useSearchStore();

  return (
    <div 
    style={{ border: "1px solid black" }}
    className="border-black h-full max-w-64 lg:w-64">
      <div className="w-full relative h-[312px] lg:h-[390px]">
        {/* <Image
          alt={product?.title || "alasooke"}
          fill
          loader={MedusaImageLoader}
          className="absolute object-cover"
          src={product?.thumbnail}
        /> */}

        <img
          alt={product?.title || "alasooke"}
          className="absolute object-cover w-full h-full"
          src={product?.thumbnail}
        />

        {itemsType === "PRODUCTS" && (
          <div className="flex justify-center hover:cursor-pointer">
            <div className="h-6 w-6 absolute bottom-4 z-5 rounded-full bg-white flex items-center justify-center">
              <TfiPlus size={16} />
            </div>
          </div>
        )}
      </div>

      <Link onClick={resetSearch} href={`/shop/${product?.handle}`}>
        <div className="pt-4 lg:pt-6 pl-1 lg:pl-7 pr-2 pb-12 flex flex-row justify-between ">
          <div>
            <p className="text-sm uppercase">
              {truncateText(product.title, 3)}
            </p>

            {showPrice && itemsType === "PRODUCTS" && product?.prices && (
              <p className="text-base">{formatCurrency(product?.prices[0]?.amount)}</p>
            )}
          </div>

          {itemsType === "PRODUCTS" && (
            <div>
              <LiaBookmark size={22} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
