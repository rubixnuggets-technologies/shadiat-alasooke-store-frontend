"use client";
import React, { useState } from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import { truncateText } from "@/utils/helpers/text";

import Link from "next/link";

export default function ProductCard({ product, showPrice }: any) {
  const [bookmarked, setBookmamrk] = useState(false);

  return (
    <div className="border-2 border-black max-w-64">
      <div className="w-full relative h-[390px]">
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

        <div className="flex justify-center hover:cursor-pointer">
          <div className="h-6 w-6 absolute bottom-4 z-5 rounded-full bg-white flex items-center justify-center">
            <TfiPlus size={16} />
          </div>
        </div>
      </div>

      <Link href={`/shop/${product?.handle}`}>
        <div className="pt-6 pl-7 pr-2 pb-12 flex flex-row justify-between ">
          <div>
            <p className="text-base uppercase">
              {truncateText(product.title, 3)}
            </p>

            {showPrice && <p className="text-base">N1000</p>}
          </div>

          <div>
            <LiaBookmark size={22} />
          </div>
        </div>
      </Link>
    </div>
  );
}
