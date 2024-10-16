"use client";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProductCard from "../ui/cards/ProductCard";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { Product } from "@medusajs/medusa";

export default function RecentlyViewed({
  currentProduct,
}: {
  currentProduct?: Product['handle'];
}) {
  const { products } = useDexieDB(currentProduct);

  if (products?.length <= 0) {
    return null;
  }

  return (
    <div className="my-20 lg:my-24">
      <div>
        <h1 className="text-[20px] lg:text-[40px] text-center"> Recently Viewed </h1>
      </div>

      <div className="my-8 lg:my-12">
        <ul className="flex flex-row overflow-scroll">
          {products?.map((product) => (
            <li key={product?.id}>
              <div className="h-full" >
                <ProductCard product={product} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {products && products?.length >= 3 && (
        <div className="flex flex-row justify-end layout gap-12">
          <div className="h-14 w-14 rounded-full bg-brown-2100 flex items-center justify-center hover:cursor-pointer">
            <IoIosArrowBack size={28} color="white" />
          </div>

          <div className="h-14 w-14 rounded-full bg-brown-2100 flex items-center justify-center hover:cursor-pointer">
            <IoIosArrowForward size={28} color="white" />
          </div>
        </div>
      )}
    </div>
  );
}
