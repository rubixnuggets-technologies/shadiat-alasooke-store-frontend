"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageLoader, MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import RichTextComponent from "../RichTextComponent";

export default function ShopNow({ data }) {
  return (
    <div className="w-full">
      <div className="h-[248px] lg:h-[850px] relative w-full">
        <div
          style={{ zIndex: 99999999 }}
          className=" pl-12 absolute h-full flex items-center "
        >
          <div className="flex flex-col gap-2 w-fit max-w-[248px]">
            {data?.title && (
              <h1 className="text-[16px] text-brown-2100 lg:text-[40px]">
                {data?.title}
              </h1>
            )}

            <RichTextComponent
              textClassname="text-[10px] lg:text-base"
              richText={data?.description}
            />

            <div className="hidden">
              <Button title="Shop Now" />
            </div>

            <div className="flex lg:hidden">
              <Link href={"/explore/shop-rtw"} >
                <p className="text-xs underline">Shop Now</p>
              </Link>
            </div>
          </div>
        </div>

        <Image
          alt={data?.title}
          fill
          className="absolute object-cover object-top "
          loader={ImageLoader}
          src={data?.image?.public_id}
        />
      </div>
    </div>
  );
}
