"use client";
import Image from "next/image";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { useState } from "react";
import cn from "classnames";
import { Product } from "@medusajs/medusa";

const ProductGallery = ({ product } : { product: Product }) => {
  const [currentImage, setCurrentImage] = useState({
    url: product?.thumbnail,
  });

  return (
    <div>
      <div className="relative h-[586px] w-[586px]">
        <Image
          fill
          loader={MedusaImageLoader}
          src={currentImage?.url || ""}
          className="object-cover"
          alt={product?.title}
        />
      </div>

      <div className="flex flex-row gap-6 mt-8">
        {product?.images.map((image) => (
          <div
          key={image?.id}
            onClick={() => setCurrentImage(image)}
            className={cn(
              "hover:cursor-pointer",
              currentImage.url === image.url ? "border-2" : ""
            )}
          >
            <Image
              key={image?.id}
              loader={MedusaImageLoader}
              src={image.url}
              height={118}
              width={131}
              className="object-cover"
              alt={product?.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
