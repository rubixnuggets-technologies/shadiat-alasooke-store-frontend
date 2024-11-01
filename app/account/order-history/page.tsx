"use client";
import { useCustomerStore } from "@/src/state/customer";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { Order } from "@medusajs/medusa";
import Image from "next/image";
import Link from "next/link";

import Button from "@/src/components/ui/button";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";

export default function Page() {
  const { customer } = useCustomerStore();
  const [customerOrders, setCustomerOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (customer) {
      (async () => {
        const { orders } = await MedusaClient.customers.listOrders();

        setCustomerOrders(orders);
      })();
    }
  }, [customer]);

  return (
    <div className="ml-0 mt-7 lg:ml-14 lg:mt-11">
      <ul>
        {isEmpty(customerOrders) ? (
          <div className="flex items-center justify-center h-[30vh] lg:h-[70vh]" >
            <h1 className="text-center text-brown-dark-1500" > You do not have existing orders </h1>
          </div>
        ) : (
          customerOrders?.map(({ items, created_at, status }) => (
            <li>
              <div>
                <div className="hidden lg:flex">
                  <p className="text-base">
                    Order Placed: {new Date(created_at).toISOString()} |{" "}
                    <span className="capitalize text-green-700">
                      {" "}
                      {status}{" "}
                    </span>{" "}
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
                            <div className="ml-3 flex flex-col gap-1 lg:gap-2">
                              <p className="text-lg">{title}</p>
                              <p className="text-brown-1700 text-xs">
                                Product Category: Collection
                              </p>
                              <p className="text-brown-1700 text-xs">
                                Quantity: {quantity}
                              </p>
                              <p className="text-brown-1700 text-xs">
                                Color: Green
                              </p>
                              <p className="text-brown-1700 text-xs">
                                Size: Large
                              </p>

                              <div className="flex mt-1 flex-row gap-3 lg:hidden ">
                                {/* <div className="flex items-center">
                                  <Link href={"/"}>
                                    <button className="bg-brown-dark-2100 text-white text-[10px] px-2 py-[3px]">
                                      Reorder
                                    </button>
                                  </Link>
                                </div> */}

                                <div className="flex items-center">
                                  <p className="text-sm font-bold">
                                    {formatCurrency(total)}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hidden lg:flex justify-end flex-col">
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

                            {/* <Link href={`/shop`}>
                              <Button title="Reorder" />
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <hr className="my-7 lg:my-11 text-[#D0D8E1] lg:text-[#F5EDE6] " />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
