"use client";
import { formatCurrency } from "@/utils/helpers/formatter";
import Button from "../ui/button";
import { CHECKOUT_VIEW, useCartStore } from "@/src/state/cart";

export default function CartCost() {
  const { cart, setCheckoutStage } = useCartStore();

  if (!cart) {
    return null;
  }

  return (
    <div className="border-[1px] max-h-[310px] border-black mx-6 lg:mx-2 lg:max-w-[328px] w-full px-6 lg:px-7 py-10 lg:py-12">
      <div className="flex justify-between">
        <p className="text-xl">Subtotal</p>
        <p className="text-xl">{formatCurrency(cart?.total)}</p>
      </div>

      <div className="flex mt-4 justify-between">
        <p className="text-xl">Discount</p>
        <p className="text-xl">{formatCurrency(cart?.discount_total || 0)}</p>
      </div>

      <div className="my-6">
        <hr className="text-brown-1500" />
      </div>

      <div className="flex justify-between">
        <p className="text-xl">Shipping Cost</p>
        <p className="text-xl">{formatCurrency(cart?.total)}</p>
      </div>

      <div className="mt-8">
        <Button
          clickAction={() => setCheckoutStage(CHECKOUT_VIEW)}
          width="full"
          title="Continue to checkout"
        />
      </div>
    </div>
  );
}
