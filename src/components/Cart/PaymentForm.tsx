"use client";
import { useCartStore } from "@/src/state/cart";
import { formatCurrency } from "@/utils/helpers/formatter";
import cn from "classnames";
import { useState } from "react";
import Button from "../ui/button";

const Circle = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-4 w-4 border-2 rounded-full flex items-center justify-center"
    )}
  >
    {active && <div className="h-2 w-2 bg-[black] rounded-full" />}
  </div>
);

export default function PaymentForm() {
  const { setPaymentDetail, paymentDetails, setCheckoutStage } =
    useCartStore();

  const [paymentMode, setPaymentMode] = useState("CREDIT_CARD");

  return (
    <div>
      <ul className="flex flex-col gap-4">
        <li>
          <div
            onClick={() => {}}
            className="flex justify-between border-2 hover:cursor-pointer border-gray-300 p-3"
          >
            <div className="flex">
              <div className="flex items-center">
                <Circle active={true} />
              </div>

              <div className="ml-2">
                <p className="text-sm"> Credit Card </p>
              </div>
            </div>
          </div>

          {paymentMode === "CREDIT_CARD" && (
            <div className="mx-2 mb-2">
              <form className="flex flex-col gap-2">
                <div className="relative z-0 w-full   group">
                  <input
                    type="number"
                    name="creditCardNumber"
                    id="creditCardNumber"
                    value={ paymentDetails.email}
                    onChange={(e) => setPaymentDetail("", e.target.value)}
                    className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="Credit card number"
                    required
                  />
                </div>

                <div className="relative z-0 w-full   group">
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    value={ paymentDetails.email}
                    onChange={(e) => setPaymentDetail("", e.target.value)}
                    className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="Name on card"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="cardCVC"
                      value={ paymentDetails.city}
                      onChange={(e) =>
                        setPaymentDetail("cardCVC", e.target.value)
                      }
                      className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Card CVC"
                      required
                    />
                  </div>

                  <div className="relative z-0 w-full   group">
                    <input
                      type="email"
                      value={ paymentDetails.region}
                      name="region"
                      id="region"
                      onChange={(e) =>
                        setPaymentDetail("region", e.target.value)
                      }
                      className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      placeholder="Select Region"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </li>

        <li>
          <div
            onClick={() => {}}
            className="flex justify-between border-2 hover:cursor-pointer border-gray-300 p-3"
          >
            <div className="flex">
              <div className="flex items-center">
                <Circle />
              </div>

              <div className="ml-2">
                <p className="text-sm"> PayPal </p>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div
            onClick={() => {}}
            className="flex justify-between border-2 hover:cursor-pointer border-gray-300 p-3"
          >
            <div className="flex">
              <div className="flex items-center">
                <Circle />
              </div>

              <div className="ml-2">
                <p className="text-sm"> Apple Pay </p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div className="mt-12">
        <div className="mb-4">
          <p className="text-xl mb-2">Billing Address</p>

          <div>
            <div>

            </div>
            <p className="text-lg">Same as my shipping address</p>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <div className="relative z-0 w-full   group">
            <label id="address" className="text-base text-gray-500 ">
              Phone number<span className="text-coral-700">*</span>
            </label>

            <input
              type="text"
              name="address"
              id="address"
              value={ paymentDetails.address}
              onChange={(e) => setPaymentDetail("address", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="relative z-0 w-full   group">
            <label id="address" className="text-base text-gray-500 ">
              Street name and house number
              <span className="text-coral-700">*</span>
            </label>

            <input
              type="text"
              name="address"
              id="address"
              value={ paymentDetails.address}
              onChange={(e) => setPaymentDetail("address", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full   group">
              <label id="city" className="text-base text-gray-500 ">
                City<span className="text-coral-700">*</span>
              </label>

              <input
                type="text"
                name="city"
                id="city"
                value={ paymentDetails.city}
                onChange={(e) => setPaymentDetail("city", e.target.value)}
                className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="City"
                required
              />
            </div>

            <div className="relative z-0 w-full   group">
              <label id="region" className="text-base text-gray-500 ">
                Region<span className="text-coral-700">*</span>
              </label>

              <input
                type="email"
                value={ paymentDetails.region}
                name="region"
                id="region"
                onChange={(e) => setPaymentDetail("region", e.target.value)}
                className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Select Region"
                required
              />
            </div>
          </div>

          <div className="relative z-0 w-full   group">
            <label id="address" className="text-base text-gray-500 ">
              Postal Code
              <span className="text-coral-700">*</span>
            </label>

            <input
              type="text"
              name="address"
              id="address"
              value={ paymentDetails.address}
              onChange={(e) => setPaymentDetail("address", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Enter Your Address"
              required
            />
          </div>
        </form>

        <div className="mt-12">
          <p>Remember My Information</p>

          <div className="mt-4">
            <p className="text-brown-1500">
              Remember my information for future check out{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          clickAction={() => setCheckoutStage("PAYMENT_VIEW")}
          width="full"
          title="Continue to Payment"
        />
      </div>
    </div>
  );
}
