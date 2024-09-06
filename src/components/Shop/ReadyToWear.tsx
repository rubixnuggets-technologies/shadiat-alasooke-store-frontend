"use client";
import React from "react";
import Image from "next/image";
import { useProducts } from "medusa-react";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import cn from "classnames";

export default function ReadyToWear({}) {
  return (
    <div className="w-full bg-brown-100 py-36">
      <div className="layout">
        <div className="mb-8">
          <p className="text-[40px]"> Visit Ready to Wear Shop </p>
        </div>

        <div className="grid grid-cols-[521px_auto] gap-24">
          <div>
            <div className="relative h-[495px] mb-12">
              <Image
                fill
                alt=""
                src={
                  "https://res.cloudinary.com/demw3uawq/image/upload/v1723580113/alasooke-project/hero-images/yijgxuzeq8zrtsx3wo7c.png"
                }
                loader={MedusaImageLoader}
                className="absolute object-cover object-top"
              />
            </div>

            <p className="text-[40px]"> Cool & Casual </p>
            <p className="text-base">
              Add a touch of elegance to any outfit with luxurious scarves,
              available in variety of styles and fabrics.
            </p>

            <div className="mt-8">
              <Button title="Shop Now" />
            </div>
          </div>

          <div>
            <div className="relative h-[921px] mb-12">
              <Image
                fill
                alt=""
                src={
                  "https://res.cloudinary.com/demw3uawq/image/upload/v1725101593/alasooke-project/jy9b4pojjotrb1ryi0m6.png"
                }
                loader={MedusaImageLoader}
                className="absolute object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
