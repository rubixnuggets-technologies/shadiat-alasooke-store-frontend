"use client";
import React from "react";
import Image from "next/image";
import { useProducts } from "medusa-react";
import { ImageLoader, MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import cn from "classnames";
import RichTextComponent from "../RichTextComponent";

export default function ShopNow({ data }) {
  return (
    <div className="w-full">
      <div className="h-[850px] relative w-full">
        <div
          style={{ zIndex: 99999999 }}
          className=" pl-12 absolute h-full flex items-center "
        >
          <div>
            {data?.title && <p className="text-[40px]"> {data?.title} </p>}

            <RichTextComponent richText={data?.description} />

            <Button title="Shop Now" />
          </div>
        </div>

        <Image
          alt={data?.title}
          fill
          className="absolute object-cover object-top"
          loader={ImageLoader}
          src={data?.image?.public_id}
        />
      </div>
    </div>
  );
}
