"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import { IoIosBookmark } from "react-icons/io";
import Link from "next/link";

import { truncateText } from "@/utils/helpers/text";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useSearchStore } from "@/src/state/store";
import { Customer, Product } from "@medusajs/medusa";
import { useCustomerStore } from "@/src/state/customer";

export default function ProductCard({ product, showPrice, itemsType }: any) {
  const { customer, setCustomer, bookmarkProduct, removeBookmark } =
    useCustomerStore();

  const { resetSearch } = useSearchStore();

  useEffect(() => {
    setCustomer();
  }, []);

  const productBookmark = useMemo(() => {
    if (customer?.metadata) {
      return customer?.metadata?.bookmarks.find(
        (item: Product) => item.id === product.id
      );
    }
  }, [customer]);

  return (
    <div
      style={{ border: "1px solid black" }}
      className="border-black h-full max-w-64 lg:w-64"
    >
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

      <div className="pt-4 lg:pt-6 pl-1 lg:pl-7 pr-2 pb-12 flex flex-row justify-between ">
        <Link onClick={resetSearch} href={`/shop/${product?.handle}`}>
          <div>
            <p className="text-sm uppercase">
              {truncateText(product.title, 3)}
            </p>

            {showPrice && itemsType === "PRODUCTS" && product?.prices && (
              <p className="text-base">
                {formatCurrency(product?.prices[0]?.amount)}
              </p>
            )}
          </div>
        </Link>

        {itemsType === "PRODUCTS" && (
          <div>
            {productBookmark ? (
              <div
                className="hover:cursor-pointer"
                onClick={() =>
                  removeBookmark(product, customer?.metadata?.bookmarks || {})
                }
              >
                <IoIosBookmark size={22} />
              </div>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={() =>
                  bookmarkProduct(product, customer?.metadata?.bookmarks || {})
                }
              >
                <LiaBookmark size={22} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
