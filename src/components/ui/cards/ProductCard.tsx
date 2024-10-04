"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import { IoIosBookmark } from "react-icons/io";
import Link from "next/link";
import { useCartStore } from "@/src/state/cart";
import { useRegions } from "medusa-react";
import { truncateText } from "@/utils/helpers/text";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useSearchStore } from "@/src/state/store";
import { Customer, Product } from "@medusajs/medusa";
import { useCustomerStore } from "@/src/state/customer";
import { useRouter } from "next/navigation";
import { useDexieDB } from "@/utils/hooks/useDexieDB";

export default function ProductCard({ product, showPrice, itemsType }: any) {
  const { customer, setCustomer, bookmarkProduct, removeBookmark } =
    useCustomerStore();

  const { resetSearch } = useSearchStore();
  const router = useRouter();

  const { storeProduct, storeCart, cartId, addProductToCart, getCart } =
    useDexieDB();

  useEffect(() => {
    setCustomer();
  }, []);

  const { regions, isLoading: isRegionLoading } = useRegions();
  const cartStore = useCartStore();

  const productBookmark = useMemo(() => {
    if (customer?.metadata?.bookmarks) {
      return customer?.metadata?.bookmarks?.find(
        (item: Product) => item.id === product.id
      );
    }
  }, [customer]);

  const quickAddToCart = async () => {
    if (!customer) {
      return router.push("/customer/login");
    }

    const userLocalRegion = regions?.find(
      (region) => region.name === "Nigeria"
    );

    if (!cartId) {
      const { cart: createdCart } = await cartStore?.createCart(
        userLocalRegion?.id,
        customer?.id
      );

      await storeCart(createdCart);

      await addProductToCart({
        variant_id: product?.variants[0]?.id,
        quantity: 1,
        cart_id: createdCart?.id,
      });

      return;
    }

    await addProductToCart({
      variant_id: product?.variants[0]?.id,
      quantity: 1,
      cart_id: cartId,
    });
  };

  const handleProductBookmark = async () => {
    if (!customer) {
      return router.push("/customer/login");
    }

    await bookmarkProduct(product, customer?.metadata?.bookmarks || {});
  };

  const handleRemoveProductBookmark = async () => {
    if (!customer) {
      return router.push("/customer/login");
    }

    await removeBookmark(product, customer?.metadata?.bookmarks || {});
  };

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
          <div
            onClick={quickAddToCart}
            className="flex justify-center hover:cursor-pointer"
          >
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
                onClick={handleRemoveProductBookmark}
              >
                <IoIosBookmark size={22} />
              </div>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={handleProductBookmark}
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
