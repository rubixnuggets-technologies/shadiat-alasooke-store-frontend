"use client";
import { useCustomerStore } from "@/src/state/customer";
import ProductCard from "@/src/components/ui/cards/ProductCard";
import { useEffect, useState } from "react";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { Order } from "@medusajs/medusa";
import Image from "next/image";
import Link from "next/link";

import Button from "@/src/components/ui/button";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";

export default function Page() {
  const { customer, setCustomer } = useCustomerStore();
  const [customerOrders, setCustomerOrders] = useState<Order[] | null>(null);

  const [ currentView, setCurrentView ] = useState("VIEW_ORDERS") 

  useEffect(() => {
    setCustomer();
  }, []);

  useEffect(() => {
    if (customer) {
      (async () => {
        const { orders } = await MedusaClient.customers.listOrders();

        setCustomerOrders(orders);
      })();
    }
  }, [customer]);

  if (!customer) return null;

  return (
    <div className="ml-14 mt-11">
      <ul>
        {customerOrders?.map(({ items, created_at, status }) => (
          <li>
            <div>
              <div>
                <p className="text-base">
                  Order Placed: {new Date(created_at).toISOString()} |{" "}
                  <span className="capitalize text-green-700"> {status} </span>{" "}
                </p>
              </div>

              <ul className="mt-7">
                {items?.map(({ thumbnail, title, quantity, total }) => (
                  <li>
                    <div className="flex flex-row justify-between ">
                      <div className="flex flex-row">
                        {thumbnail && (
                          <div className="relative w-[86px] h-36">
                            <Image
                              src={thumbnail}
                              className="absolute objec-cover"
                              fill
                              loader={MedusaImageLoader}
                              alt={title}
                            />
                          </div>
                        )}

                        <div className="flex items-center">
                          <div className="ml-3 flex flex-col gap-2">
                            <p className="text-lg">{title}</p>
                            <p className="text-xs">
                              Product Category: Collection
                            </p>
                            <p className="text-xs">Quantity: {quantity}</p>
                            <p className="text-xs">Color: Green</p>
                            <p className="text-xs">Size: Large</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end flex-col">
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <button className="border-[1px] border-brown-1000 rounded text-brown-1500 py-2 px-3">
                              Rate Product
                            </button>
                          </div>

                          <div>
                            <p className="text-lg text-right">
                              {" "}
                              {formatCurrency(total)}{" "}
                            </p>
                          </div>

                          <Link href={`/shop`}>
                            <Button title="Reorder" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="my-11 text-[#F5EDE6] " />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
