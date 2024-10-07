"use client";
import dynamic from "next/dynamic";

import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";
import { useCartStore } from "@/src/state/cart";

const DynamicPayement = dynamic(() => import("../Payment/PaymentProvider"), {
  loading: () => <p>Loading Payment Provider</p>,
});

export default function CartSummary({
  nextClickAction,
}: {
  nextClickAction?: () => void;
}) {
  const { cart, checkoutStage } = useCartStore();

  return (
    <div className="max-w-96 w-96">
      <div>
        <div className="mb-4">
          <p className="text-base">Your order</p>
        </div>

        <ul>
          {cart?.items.map(({ id, title, thumbnail, total, variant }) => (
            <li key={id}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <Image
                    alt={title}
                    src={thumbnail}
                    loader={MedusaImageLoader}
                    height={89}
                    width={70}
                  />

                  <div className="flex flex-col ml-4">
                    <p className="text-sm text-brown-1700 lg:text-lg mb-2 font-semibold">
                      {title}{" "}
                    </p>
                    <p className="text-xs mb-2">COLOR</p>
                    <p className="text-[10px]">{variant?.title}</p>
                  </div>
                </div>

                <div className="">
                  <p> {formatCurrency(total)} </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-10">
        <hr className="text-[#D0D8E1] lg:text-brown-1000" />
      </div>

      <div>
        <div className="mb-8">
          <p className="text-sm"> Discount code </p>

          <div className="mt-4 mb-2 w-full h-12 gap-2 flex flex-row ">
            <input
              className="w-full text-xs lg:text-base rounded-none border-[1px] border-brown-2100 bg-transparent text-2100 px-4"
              placeholder="Add discount code"
            />

            <button className="bg-brown-2100 text-brown-100 w-36">Apply</button>
          </div>

          <p className="text-xs lg:text-sm text-brown-1500">
            New customer?
            <Link href={"/customer/login"}>
              <span className="underline text-green-600"> Sign up </span>
            </Link>
            to get better offer
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg">{formatCurrency(cart?.total)}</p>
        </div>

        <div className="flex mt-4 justify-between">
          <p className="text-lg">Discount</p>
          <p className="text-lg">{formatCurrency(cart?.discount_total || 0)}</p>
        </div>

        <div className="flex mt-2 justify-between">
          <p className="text-lg">Shipping Cost</p>
          <p className="text-lg">{formatCurrency(cart?.total)}</p>
        </div>

        <div className="my-6">
          <hr className="text-brown-1000" />
        </div>

        <div className="flex justify-between">
          <p className="text-lg">Grand total</p>
          <p>{formatCurrency(cart?.total)}</p>
        </div>
      </div>

      <div className="mt-8">
        {checkoutStage === "PAYMENT_VIEW" ? (
          <DynamicPayement />
        ) : (
          <Button
            clickAction={nextClickAction}
            width="full"
            title="Continue to Payment"
          />
        )}
      </div>
    </div>
  );
}
