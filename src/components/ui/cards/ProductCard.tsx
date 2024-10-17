"use client";
import React, { useMemo } from "react";
import { TfiPlus } from "react-icons/tfi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

import Link from "next/link";
import { useCartStore } from "@/src/state/cart";
import { useRegions } from "medusa-react";
import { truncateText } from "@/utils/helpers/text";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useSearchStore } from "@/src/state/store";
import { Product } from "@medusajs/medusa";
import { useCustomerStore } from "@/src/state/customer";
import { useRouter } from "next/navigation";

import { head } from "lodash";

export default function ProductCard({
  product,
  itemsType,
}: {
  product: Product;
  itemsType: string;
}) {
  const { customer, modifyCustomerCartId, bookmarkProduct, removeBookmark } =
    useCustomerStore();

  const { resetSearch } = useSearchStore();
  const router = useRouter();
  const { addProductToCart } = useCartStore()

  // const { addProductToCart } = useDexieDB();

  const { regions } = useRegions();
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

    if (!customer?.metadata?.cartId) {
      const userLocalRegion = regions?.find(
        (region) => region.name === "Nigeria"
      );

      const { cart: createdCart } = await cartStore?.createCart(
        userLocalRegion?.id,
        customer?.id
      );

      await modifyCustomerCartId(createdCart);

      await addProductToCart({
        variant_id: product?.variants[0]?.id,
        quantity: 1,
        cart_id: createdCart?.id,
      });

      return router.push("/cart");
    }

    await addProductToCart({
      variant_id: product?.variants[0]?.id,
      quantity: 1,
      cart_id: customer?.metadata?.cartId,
    });

    return router.push("/cart");
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
    <div className="border-black border-[0.50px] h-full min-w-40 md:min-w-48 lg:min-w-64">
      <div className="w-full overflow-hidden relative h-[312px] lg:h-[390px]">
        <Link
          onClick={resetSearch}
          href={
            (product?.metadata?.PRODUCT_TYPE as unknown as string) === "NATIVE"
              ? `/natives/${product?.handle}`
              : `/ready-to-wear/${product?.handle}`
          }
        >
          <img
            alt={product?.title || "alasooke"}
            className="absolute transition ease-in-out duration-500 hover:scale-110	object-cover w-full h-full"
            src={product?.thumbnail}
          />
        </Link>

        {itemsType === "PRODUCTS" && (
          <div
            onClick={quickAddToCart}
            className="flex justify-center hover:cursor-pointer"
          >
            <div className="h-6 w-6 absolute bottom-4 z-5 rounded-full bg-white flex items-center justify-center">
              <TfiPlus size={14} />
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 lg:pt-6 pl-1 lg:pl-7 pr-2 pb-12 flex flex-row justify-between ">
        <Link
          onClick={resetSearch}
          href={
            (product?.metadata?.PRODUCT_TYPE as unknown as string) === "NATIVE"
              ? `/natives/${product?.handle}`
              : `/shop/${product?.handle}`
          }
        >
          <div>
            <p className="text-xs lg:text-sm uppercase">
              {truncateText(product.title, 3)}
            </p>

            {product?.variants?.length >= 1 && (
              <p className="text-[11px] mt-2 lg:text-base">
                {formatCurrency(head(head(product?.variants)?.prices)?.amount)}
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
                <IoIosHeart size={22} />
              </div>
            ) : (
              <div
                className="hover:cursor-pointer"
                onClick={handleProductBookmark}
              >
                <IoIosHeartEmpty size={22} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
