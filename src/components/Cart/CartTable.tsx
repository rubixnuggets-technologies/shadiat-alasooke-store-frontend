"use client";
import { useState } from "react";
import Checkbox from "../ui/Checkbox";
import CartTableItem from "./CartTableItem";
import { useCartStore } from "@/src/state/cart";

export default function CartTable() {
  const { cart } = useCartStore();

  const [markedProducts, setMarkedProducts] = useState<Array<string>>([]);

  const markAllProducts = () => {
    if (markedProducts?.length === cart?.items?.length)
      return setMarkedProducts([]);

    cart?.items.forEach((product) =>
      setMarkedProducts((state) => {
        if (state.includes(product.id)) return state;

        return [...state, product.id];
      })
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-center">
        <thead className="text-xs text-gray-700 border-b-[0.80px] border-brown-light-1000 capitalize bg-gray-50">
          <tr>
            <th scope="col" className="py-6">
              <div className="flex flex-row">
                {/* <div className="mr-2 lg:mr-4 flex items-center">
                  <Checkbox
                    isActive={
                      cart?.items?.length >= 1 &&
                      markedProducts?.length === cart?.items?.length
                    }
                    selectCheckbox={markAllProducts}
                  />
                </div> */}

                <div className="flex items-center">
                  <p className="text-xs lg:text-xl text-brown-2100">
                    All Products
                  </p>
                </div>
              </div>
            </th>
            <th scope="col" className="py-6">
              <p className="text-xs lg:text-xl text-brown-2100">Quantity</p>
            </th>
            <th scope="col" className="py-6">
              <p className="text-xs lg:text-xl text-brown-2100">Price</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => {
            return (
              <CartTableItem
                key={product?.id}
                isMarked={markedProducts?.includes(product?.id)}
                product={product}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
