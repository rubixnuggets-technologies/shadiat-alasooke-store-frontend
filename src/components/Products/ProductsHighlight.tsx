"use client";
import React from "react";
import { LiaBookmark } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import Image from "next/image";
import { useProducts } from "medusa-react";
import { ImageLoader, MedusaImageLoader } from "@/utils/helpers/Cloudinary";

export default function ProductsHighlight() {
  const { products, isLoading } = useProducts({
    limit: 12,
  });

//   console.log(products);
  

  return (
    <div>
      <div className="layout ">
        <p className="text-[40px]">Ready to Wear Collections</p>
      </div>

      <div className="mt-14">
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
                    <p className="text-base">N1000</p>
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
  );
}
