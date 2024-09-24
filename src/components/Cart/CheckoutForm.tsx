"use client";
import { useCartStore } from "@/src/state/cart";
import { formatCurrency } from "@/utils/helpers/formatter";
import cn from "classnames";
import { useState } from "react";
import Button from "../ui/button";
import { useDexieDB } from "@/utils/hooks/useDexieDB";

const AVAILABLE_DELIVERY_METHODS = [
  {
    id: 1,
    name: "Free Delivery",
    price: 5,
    duration: "7-30 business days",
  },
  {
    id: 2,
    name: "Regular Delivery",
    price: 8,
    duration: "3-14 business days",
  },
  {
    id: 3,
    name: "Express Delivery",
    price: 9,
    duration: "1-3 business days",
  },
];

const Circle = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-4 w-4 border-2 rounded-full flex items-center justify-center"
    )}
  >
    {active && <div className="h-2 w-2 bg-[black] rounded-full" />}
  </div>
);

export default function CheckoutForm() {
  const {
     setDeliveryDetail,
     deliveryDetails,
    setCheckoutStage,
    addDeliveryAddress,
  } = useCartStore();

  const { cartId } = useDexieDB();

  const [deliveryMethod, selectDeliveryMethod] = useState(
    AVAILABLE_DELIVERY_METHODS[0]
  );

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} >
        <div className="relative z-0 w-full mb-12 group">
          <label id="floating_email" className="text-base text-gray-500 ">
            Select Delivery Date
          </label>

          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block  h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Select Date"
            required
          />
        </div>

        <div className="mb-3">
          <p>Delivery Address</p>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label id="fullName" className="text-base text-gray-500 ">
            Full Name <span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            value={ deliveryDetails.fullName}
            id="fullName"
            onChange={(e) =>  setDeliveryDetail("fullName", e.target.value)}
            className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Full Name"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label id="email" className="text-base text-gray-500 ">
              Email Address <span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={ deliveryDetails.email}
              onChange={(e) =>  setDeliveryDetail("email", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label id="floating_email" className="text-base text-gray-500 ">
              Confirmation Email <span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              name="floating_email"
              id="floating_email"
              value={ deliveryDetails.email}
              onChange={(e) =>  setDeliveryDetail("email", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Confirm Email Address"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label id="phoneNumber" className="text-base text-gray-500 ">
            Phone Number<span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={ deliveryDetails.phoneNumber}
            id="phoneNumber"
            onChange={(e) =>  setDeliveryDetail("phoneNumber", e.target.value)}
            className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Phone Number (Only Digit)"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label id="address" className="text-base text-gray-500 ">
            Address<span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="address"
            id="address"
            value={ deliveryDetails.address}
            onChange={(e) =>  setDeliveryDetail("address", e.target.value)}
            className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Your Address"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label id="city" className="text-base text-gray-500 ">
              City<span className="text-coral-700">*</span>
            </label>

            <input
              type="text"
              name="city"
              id="city"
              value={ deliveryDetails.city}
              onChange={(e) =>  setDeliveryDetail("city", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="City"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label id="region" className="text-base text-gray-500 ">
              Region<span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              value={ deliveryDetails.region}
              name="region"
              id="region"
              onChange={(e) =>  setDeliveryDetail("region", e.target.value)}
              className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Select Region"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label id="postalCode" className="text-base text-gray-500 ">
            Postal Code<span className="text-coral-700">*</span>
          </label>

          <input
            type="email"
            name="postalCode"
            id="postalCode"
            value={ deliveryDetails.postalCode}
            onChange={(e) =>  setDeliveryDetail("postalCode", e.target.value)}
            className="block h-11 px-3 mt-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Postal Code"
            required
          />
        </div>
      </form>

      <div className="mt-4">
        <p className="text-base"> Delivery Method </p>

        <div className="flex flex-col gap-6 mt-3">
          {AVAILABLE_DELIVERY_METHODS.map((method) => (
            <div
              key={method.id}
              onClick={() => selectDeliveryMethod(method)}
              className="flex justify-between border-2 hover:cursor-pointer border-gray-300 p-3"
            >
              <div className="flex">
                <div className="flex items-center">
                  <Circle active={deliveryMethod.id === method.id} />
                </div>

                <div className="ml-2">
                  <p className="text-sm"> {method.name} </p>
                  <p className="text-sm"> {method.duration} </p>
                </div>
              </div>

              <div>
                <p className="font-semibold">{formatCurrency(method.price)} </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button
          clickAction={() => addDeliveryAddress({ cartId,  deliveryDetails })}
          width="full"
          title="Continue to Payment"
        />
      </div>
    </div>
  );
}
