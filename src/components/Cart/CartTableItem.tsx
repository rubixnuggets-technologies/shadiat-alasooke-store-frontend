"use client";
import { use, useEffect, useState } from "react";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";
import { Cart, useProduct } from "medusa-react";
import Image from "next/image";
import Checkbox from "../ui/Checkbox";
import { useCustomerStore } from "@/src/state/customer";
import { useCartStore } from "@/src/state/cart";

export default function CartTableItem({
  isMarked,
  product: { id, title, thumbnail, variant, quantity, total },
}: {
  product: Cart["items"][0];
  isMarked: boolean;
}) {
  const { removeProductFromCart, updateProductInCart } = useCartStore()
  const { customer } = useCustomerStore()
  const [itemCount, setItemCount] = useState<number>(quantity);

  const modifyItemCount = async (type: "INCREASE" | "DECREASE") => {
    if (type === "INCREASE") {
      let count = itemCount;
      count += 1;

      setItemCount(count);
      await updateProductInCart({
        cart_id: customer?.metadata?.cartId!,
        item_id: id,
        quantity: count,
      });

      return;
    }

    if (itemCount >= 1 || itemCount - 1 > 1) {
      let count = itemCount;
      count -= 1;

      setItemCount(count);
      await updateProductInCart({
        cart_id: customer?.metadata?.cartId!,
        item_id: id,
        quantity: count,
      });
    }
  };

  return (
    <tr className="bg-white">
      <th
        scope="row"
        className="py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <div className="flex flex-row">
          <div className="flex">
            <div className="mr-2 lg:mr-4 flex items-center">
              <Checkbox isActive={isMarked} selectCheckbox={() => {}} />
            </div>

            <div className="w-[33px] h-[43px] lg:w-[33px] lg:h-[43px] relative">
              <Image
                alt={title}
                src={thumbnail}
                className="object-cover absolute"
                loader={MedusaImageLoader}
                fill
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col  ml-4">
              <p className="text-[10px] lg:text-xl"> {title} </p>
              <p className="text-[8px] lg:text-lg text-left">
                {" "}
                {variant?.title}{" "}
              </p>
            </div>
          </div>
        </div>
      </th>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="flex text-brown-1500 flex-row justify-between ">
            <div onClick={() => modifyItemCount("INCREASE")}>
              <p className="text-brown-1500 hover:cursor-pointer text-[12px] lg:text-xl">
                +
              </p>
            </div>
            <p className="text-brown-1500 hover:cursor-pointer text-[10px] lg:text-xl">
              {itemCount}
            </p>

            <div onClick={() => modifyItemCount("DECREASE")}>
              <p className="text-brown-1500 hover:cursor-pointer text-[12px] lg:text-xl">
                -
              </p>
            </div>
          </div>

          <div
            onClick={() =>
              removeProductFromCart({
                item_id: id,
                cart_id: customer?.metadata?.cartId!,
              })
            }
            className="flex justify-center hover:cursor-pointer mt-2 lg:mt-4"
          >
            <p className="text-coral-700 text-[10px] lg:text-base">Remove</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-xs lg:text-xl font-semibold">
            {" "}
            {formatCurrency(total)}{" "}
          </p>
        </div>
      </td>
    </tr>
  );
}
