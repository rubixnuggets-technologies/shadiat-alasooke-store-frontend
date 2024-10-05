"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import RichTextComponent from "../RichTextComponent";

export default function ShopNow({ data }) {
  return (
      <div className="h-[248px] lg:h-[850px] relative w-full">
        <div
          style={{ zIndex: 99999999 }}
          className="pl-4 lg:pl-12 absolute h-full flex items-center "
        >
          <div className="flex flex-col gap-2 w-fit">
            {data?.title && (
              <h1 className={`text-base text-${data?.text_color || "brown-2100" } lg:text-[40px]`}>
                {data?.title}
              </h1>
            )}

            <RichTextComponent
              textClassname={`max-w-[157px] lg:max-w-[303px] text-[10px] lg:text-lg mt-1 lg:mt-4 mb-1 lg:mb-2 text-${data?.text_color}`}
              richText={data?.description}
            />

            <div className="hidden lg:flex">
              <Button width="52" title="Shop Now" />
            </div>

            <div className="flex lg:hidden">
              <Link href={"/explore/shop-rtw"}>
                <p className="text-xs underline font-bold">Shop Now</p>
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
  );
}
