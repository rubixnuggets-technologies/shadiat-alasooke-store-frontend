import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

import { MedusaImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";
import { formatCurrency } from "@/utils/helpers/formatter";
import { useCartStore } from "@/src/state/cart";

export default function PaymentSuccess() {
  const { cart, setCheckoutStage } = useCartStore();

  return (
    <div className="max-w-[815px] m-auto">
      <div className="border-[0.5px] lg:border-0 rounded pt-8 px-8 pb-4 border-[#D0D8E1]">
        <div>
          <div className="flex justify-center">
            <div className="h-9 w-9 lg:h-24 lg:w-24 bg-[#3EB489] mb-2 flex justify-center items-center rounded-full">
              <IoMdCheckmark color="white" className="text-xl lg:text-6xl" />
            </div>
          </div>

          <div>
            <p className="text-center text-sm lg:text-4xl">
              {" "}
              Thanks for your order{" "}
            </p>
            <p className="text-center text-[10px] lg:text-xl mt-1">
              The order confirmation has been sent to {cart?.email}
            </p>

            <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />

            <ul>
              <li>
                <div>
                  <p className="text-[10px] lg:text-xl ">Transaction date</p>
                  <p className="text-[8px] lg:text-lg text-brown-1700">
                    Thursday, Nov 17, 2022
                  </p>
                  <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />
                </div>
              </li>

              <li>
                <div>
                  <p className="text-[10px] lg:text-xl ">Payment method</p>
                  <p className="text-[8px] lg:text-lg  text-brown-1700">
                    Mastercard ending with 1234
                  </p>
                  <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />
                </div>
              </li>

              <li>
                <div>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xl ">Shipping method</p>
                      <p className="text-[8px] lg:text-lg  text-brown-1700">
                        Express delivery (1-3 business days)
                      </p>
                    </div>

                    <div className="flex items-center">
                      <a href="/" className="underline">
                        <p className="text-[10px] lg:text-lg">Track order</p>
                      </a>
                    </div>
                  </div>

                  <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />
                </div>
              </li>

              <li>
                <ul>
                  {cart?.items.map((item) => (
                    <div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                          <div className="h-7 w-7 lg:h-[77px] lg:w-[69px] relative">
                            <Image
                              className="absolute object-cover"
                              fill
                              alt="product"
                              loader={MedusaImageLoader}
                              src={item?.thumbnail}
                            />
                          </div>

                          <div className="flex flex-col ml-4">
                            <p className="text-[10px] text-brown-1700 lg:text-lg font-semibold">
                              {item?.title}
                            </p>
                            <p className="text-[8px] lg:text-lg">
                              {item?.variant?.title}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <p className="text-[10px] lg:text-sm">
                            {formatCurrency(item?.total)}{" "}
                          </p>
                        </div>
                      </div>

                      <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />
                    </div>
                  ))}
                </ul>
              </li>

              <li>
                <div>
                  <div className="flex mb-4 flex-row justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xl">
                        Applied discount code
                      </p>
                    </div>

                    <div className="flex items-center justify-center ">
                      <div className="bg-[#000] px-1.5 lg:px-5 lg:py-3.5 flex items-center justify-center">
                        <p className="text-[#fff] text-[8px] lg:text-xl">
                          10% off
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-3 flex-row justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xl">Discount</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[10px] lg:text-lg">
                        {" "}
                        {formatCurrency(cart?.discount_total)}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xl">Shipping cost</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[10px] lg:text-lg">
                        {" "}
                        {formatCurrency(cart?.shipping_total)}{" "}
                      </p>
                    </div>
                  </div>

                  <hr className="mt-4 mb-10 text-[#D0D8E1] lg:text-[#E8D4C1] h-[0.35]" />
                </div>
              </li>

              <li>
                <div>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xl">Grand total</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[10px] lg:text-lg">
                        {" "}
                        {formatCurrency(cart?.total)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="w-full mt-6">
              <Link href={"/"}>
                <Button
                  clickAction={() => setCheckoutStage("CART_VIEW")}
                  width="full"
                  title="Back to shopping"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
