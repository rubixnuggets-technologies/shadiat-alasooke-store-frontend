"use client";
import Image from "next/image";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { useState } from "react";
import cn from "classnames";
import { Product } from "@medusajs/medusa";

const ProductGallery = ({ product }: { product: Product }) => {
  const [currentImage, setCurrentImage] = useState({
    url: product?.thumbnail,
  });

  return (
    <div>
      <div className="relative ">
        <img
          src={currentImage?.url || ""}
          className="object-cover h-[452px] lg:h-[586px] w-full lg:w-[586px]"
          alt={product?.title}
        />
      </div>

      <div className="flex flex-row gap-2 lg:gap-6 mt-8">
        {[{ url: product?.thumbnail }, ...product?.images].map((image) => (
          <div
            key={image?.id}
            onClick={() => setCurrentImage(image)}
            className={cn(
              "",
              currentImage.url === image.url ? "border-[1px]" : ""
            )}
          >
            <img
              src={image.url}
              className="object-cover w-16 h-16 lg:h-28 lg:w-32 hover:cursor-pointer"
              alt={product?.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
