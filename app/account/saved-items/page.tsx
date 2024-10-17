"use client";
import { useCustomerStore } from "@/src/state/customer";
import ProductCard from "@/src/components/ui/cards/ProductCard";
import { isEmpty } from "lodash";

export default function Page() {
  const { customer } = useCustomerStore();
  if (!customer?.metadata || isEmpty(customer?.metadata?.bookmarks)) return (
    <div className="flex items-center justify-center h-[30vh] lg:h-[70vh]" >
    <h1 className="text-center text-brown-dark-1500" > You do not have any saved items </h1>
  </div>
  );

  return (
    <div>
      <ul className="grid grid-cols-2 lg:flex flex-row flex-wrap ml-0 lg:ml-8 mt-8">
        {customer?.metadata?.bookmarks?.map((product) => (
          <li className="" key={product.id}>
            <ProductCard {...{ product, itemsType: "PRODUCTS" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
