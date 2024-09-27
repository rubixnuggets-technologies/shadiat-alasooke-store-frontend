"use client";
import React from "react";
import Image from "next/image";
import { useProducts } from "medusa-react";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import cn from "classnames";

export default function ReadyToWear({}) {
  return (
    <div className="w-full bg-brown-100 py-11 lg:py-36">
      <div className="layout">
        <div className="mb-8">
          <h1 className="text-[20px] text-brown-2100 lg:text-[40px]">
            Visit Ready to Wear Shop 
          </h1>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[521px_auto] lg:gap-24">
          <div className="">
            <div className="relative h-[372px] lg:h-[495px] mb-7 lg:mb-12">
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

            <div className="flex flex-col mb-8 lg:mb-0 max-w-[215px] lg:max-w-full m-auto justify-center">
              <h1 className="text-[20px] text-center lg:text-left text-brown-2100 lg:text-[40px]">
                Cool & Casual
              </h1>

              <div className="mt-4">
                <p className="text-xs text-center lg:text-left lg:text-lg">
                  Add a touch of elegance to any outfit with luxurious scarves,
                  available in variety of styles and fabrics.
                </p>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <Button title="Shop Now" />
              </div>
            </div>
          </div>

          <div>
            <div className="hidden lg:flex relative h-[921px] mb-12">
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
