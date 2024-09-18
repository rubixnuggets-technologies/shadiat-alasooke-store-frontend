"use client";

import Button from "../ui/button";

export default function CartCost() {
  return (
    <div className="border-2 border-black max-w-[328px] w-full px-7 p-12">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>Subtotal</p>
      </div>

      <div className="flex mt-4 justify-between">
        <p>Discount</p>
        <p>N0</p>
      </div>

      <div className="my-6">
        <hr className="text-brown-1500" />
      </div>

      <div className="flex justify-between">
        <p>Shipping Cost</p>
        <p>N220,900</p>
      </div>

      <div className="mt-8">
        <Button title="Continue to checkout" />
      </div>
    </div>
  );
}
