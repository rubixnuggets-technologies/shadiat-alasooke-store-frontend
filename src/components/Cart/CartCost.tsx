"use client";
import { formatCurrency } from "@/utils/helpers/formatter";
import Button from "../ui/button";
import { Cart } from "medusa-react";
import { CHECKOUT_VIEW, useCartStore } from "@/src/state/cart";

export default function CartCost({ cart }: { cart: Cart }) {
  const cartStore = useCartStore();

  if (!cart) {
    return null;
  }

  return (
    <div className="border-2 border-black max-w-[328px] w-full px-7 p-12">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{formatCurrency(cart?.total)}</p>
      </div>

      <div className="flex mt-4 justify-between">
        <p>Discount</p>
        <p>{formatCurrency(cart?.discount_total || 0)}</p>
      </div>

      <div className="my-6">
        <hr className="text-brown-1500" />
      </div>

      <div className="flex justify-between">
        <p>Shipping Cost</p>
        <p>{formatCurrency(cart?.total)}</p>
      </div>

      <div className="mt-8">
        <Button clickAction={() => cartStore?.setCheckoutStage(CHECKOUT_VIEW)} width="full" title="Continue to checkout" />
      </div>
    </div>
  );
}
