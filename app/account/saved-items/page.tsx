"use client";
import { useEffect } from "react";
import { useCustomerStore } from "@/src/state/customer";
import ProductCard from "@/src/components/ui/cards/ProductCard";

export default function Page() {
  const { customer, setCustomer } = useCustomerStore();

  if (!customer?.metadata) return null;

  return (
    <div>
      <ul className="grid grid-cols-2 lg:flex flex-row flex-wrap ml-8 mt-8">
        {customer?.metadata?.bookmarks?.map((product) => (
          <li className="" key={product.id}>
            <ProductCard {...{ product, itemsType: "PRODUCTS" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
