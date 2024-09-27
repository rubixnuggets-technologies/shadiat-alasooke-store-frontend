"use client";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { Cart, useCart } from "medusa-react";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";

export default function CartSummary({ cart }: { cart: Cart }) {
  const {} = useDexieDB();

  return (
    <div className="max-w-96 w-96">
      <div>
        <div className="mb-4">
          <p className="text-base">Your order</p>
        </div>

        <ul>
          {cart?.items.map(
            ({ id, title, thumbnail, quantity, total, variant }) => (
              <li key={id}>
                <div className="flex flex-row">
                  <Image
                    alt={title}
                    src={thumbnail}
                    loader={MedusaImageLoader}
                    height={89}
                    width={70}
                  />

                  <div className="flex ml-2">
                    <div className="flex flex-col  ml-4">
                      <p className="text-lg font-semibold"> {title} </p>
                      <p>Green</p>
                      <p>{variant?.title}</p>
                    </div>
                  </div>

                  <div className="ml-12">
                    <p> {formatCurrency(total)} </p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="my-10">
        <hr className="text-brown-1000" />
      </div>

      <div>
        <div className="mb-8">
          <p className="text-sm"> Discount code </p>

          <div className="mt-4 mb-2 w-full h-12 gap-2 flex flex-row ">
            <input
              className="w-full border-2 border-brown-2100 bg-transparent text-2100 px-4"
              placeholder="Add discount code"
            />

            <button className="bg-brown-2100 text-brown-100 w-36">Apply</button>
          </div>

          <p className="text-sm text-brown-1500">
            New customer?
            <Link href={"/customer/login"}>
              <span className="underline text-green-600"> Sign up </span>
            </Link>
            to get better offer
          </p>
        </div>

        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{formatCurrency(cart?.total)}</p>
        </div>

        <div className="flex mt-4 justify-between">
          <p>Discount</p>
          <p>{formatCurrency(cart?.discount_total || 0)}</p>
        </div>

        <div className="flex justify-between">
          <p>Shipping Cost</p>
          <p>{formatCurrency(cart?.total)}</p>
        </div>

        <div className="my-6">
          <hr className="text-brown-1000" />
        </div>

        <div className="flex justify-between">
          <p>Grand total</p>
          <p>{formatCurrency(cart?.total)}</p>
        </div>

        <div className="mt-8">
          <Button
            clickAction={() => {}}
            width="full"
            title="Continue to Payment"
          />
        </div>
      </div>
    </div>
  );
}