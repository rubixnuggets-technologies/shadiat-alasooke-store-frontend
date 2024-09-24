"use client";
import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { Cart, useCart } from "medusa-react";
import Image from "next/image";

export default function CartTable({ cart }: { cart: Cart }) {
  const { cartId } = useDexieDB();

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 border-b border-brown-1000 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                <p>All Products</p>
              </th>
              <th scope="col" className="px-6 py-3">
                <p>Quantity</p>
              </th>
              <th scope="col" className="px-6 py-3">
                <p>Price</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.items.map(({ title, thumbnail, quantity, total }) => {
              return (
                <tr className="bg-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex flex-row">
                      <div>
                        <Image
                          alt={title}
                          src={thumbnail}
                          loader={MedusaImageLoader}
                          height={88}
                          width={70}
                        />
                      </div>

                      <div className="flex items-center">
                        <div className="flex flex-col  ml-4">
                          <p> {title} </p>
                          <p>Green</p>
                        </div>
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex text-brown-1500 flex-row justify-between ">
                        <p className="text-brown-1500 hover:cursor-pointer text-xl">
                          +
                        </p>
                        <p className="text-brown-1500 hover:cursor-pointer text-xl">
                          {quantity}
                        </p>
                        <p className="text-brown-1500 hover:cursor-pointer text-xl">
                          -
                        </p>
                      </div>

                      <div className="flex justify-center hover:cursor-pointer mt-4">
                        <p className="text-coral-700">Remove</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p> {formatCurrency(total)} </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
