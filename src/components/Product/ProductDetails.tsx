"use client";
import Image from "next/image";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import cn from "classnames";
import ProductGallery from "./ProductGallery";
import { formatCurrency } from "@/utils/helpers/formatter";
import { Product } from "@medusajs/medusa";

const ProductDetails = ({ product }: { product: Product }) => {
  const [itemVariant, setVariant] = useState(product?.variants[0]);

  const addToCart = () => {};

  return (
    <div className="layout">
      <div className="grid grid-cols-2">
        <ProductGallery product={product} />

        <div className="max-w-[466px]">
          <div>
            <p className="text-brown-2100 text-3xl">{product?.title}</p>

            {itemVariant && (
              <div className="mt-8">
                <p className="text-lg text-brown-2100">
                  {formatCurrency(itemVariant?.prices[0]?.amount)}
                </p>
              </div>
            )}

            <p className="my-8">{product?.description}</p>
          </div>

          <div>
            <div className="mb-8 flex flex-row">
              <div className="flex items-center mr-6">
                <p className="text-lg"> Size </p>
              </div>

              <ul className="flex flex-row flex-wrap gap-4">
                {product?.variants.map((variant) => (
                  <li onClick={() => setVariant(variant)} key={variant?.id}>
                    <div className="flex h-12 hover:cursor-pointer px-6 items-center justify-center flex-row gap-3 border-2 border-brown-1500">
                      <p className="text-lg capitalize">{variant?.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[80px_auto_80px] gap-2">
              <div className="flex h-12  max-w-[80px] items-center justify-center flex-row gap-3 border-2">
                <div>
                  <p className="text-lg hover:cursor-pointer">-</p>
                </div>

                <div>
                  <p className="text-lg hover:cursor-pointer">0</p>
                </div>

                <div>
                  <p className="text-lg hover:cursor-pointer">+</p>
                </div>
              </div>

              <div
                onClick={addToCart}
                className="border-2 h-12  flex items-center justify-center hover:cursor-pointer"
              >
                <p className="uppercase"> Add To Cart </p>
              </div>

              <div className="border-2 h-12 max-w-[80px] flex items-center justify-center hover:cursor-pointer">
                <FaHeart size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
