"use client";
import { useCartStore } from "@/src/state/cart";
import { formatCurrency } from "@/utils/helpers/formatter";
import cn from "classnames";
import { useState } from "react";
import Button from "../ui/button";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { useCartShippingOptions } from "medusa-react";
import { useRegions } from "medusa-react";
import { useCustomerStore } from "@/src/state/customer";

const Circle = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-4 w-4 border-[1px] rounded-full flex items-center justify-center"
    )}
  >
    {active && <div className="h-2 w-2 bg-[black] rounded-full" />}
  </div>
);

export default function CheckoutForm() {
  const {
    setDeliveryDetail,
    deliveryDetails,
    addDeliveryAddress,
  } = useCartStore();

  const { customer } = useCustomerStore()

  const { shipping_options, isLoading: isLoadingShippingMethods } =
    useCartShippingOptions(customer?.metadata?.cartId || "");

  const [deliveryMethod, selectDeliveryMethod] = useState(
    isLoadingShippingMethods ? null : shipping_options[0]
  );

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative z-0 w-full mb-4 lg:mb-8 group">
          <label
            id="floating_email"
            className="text-[10px] lg:text-base text-gray-500 "
          >
            Select Delivery Date
          </label>

          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="block rounded-none lg:rounded h-10 lg:h-11 px-3  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Select Date"
            required
            disabled
          />
        </div>

        <div className="">
          <p className="text-[10px] lg:text-base">Delivery Address</p>
        </div>

        <div className="relative z-0 w-full group">
          <label
            id="fullName"
            className="text-[8px] lg:text-base text-gray-500 "
          >
            Full Name <span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            value={deliveryDetails.fullName}
            id="fullName"
            onChange={(e) => setDeliveryDetail("fullName", e.target.value)}
            className="block px-3 mt-1 lg:mt-3 w-full rounded-none lg:rounded h-10 lg:h-11 text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Full Name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-6">
          <div className="relative z-0 w-full   group">
            <label
              id="email"
              className="text-[8px] lg:text-base text-gray-500 "
            >
              Email Address <span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={deliveryDetails.email}
              onChange={(e) => setDeliveryDetail("email", e.target.value)}
              className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 rounded-none lg:rounded w-full text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative z-0 w-full   group">
            <label
              id="floating_email"
              className="text-[8px] lg:text-base text-gray-500 "
            >
              Confirmation Email <span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              name="floating_email"
              id="floating_email"
              value={deliveryDetails.email}
              onChange={(e) => setDeliveryDetail("email", e.target.value)}
              className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 rounded-none lg:rounded w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Confirm Email Address"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full   group">
          <label
            id="phoneNumber"
            className="text-[8px] lg:text-base text-gray-500 "
          >
            Phone Number<span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={deliveryDetails.phoneNumber}
            id="phoneNumber"
            onChange={(e) => setDeliveryDetail("phoneNumber", e.target.value)}
            className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 rounded-none lg:rounded w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Phone Number (Only Digit)"
            required
          />
        </div>

        <div className="relative z-0 w-full   group">
          <label
            id="address"
            className="text-[8px] lg:text-base text-gray-500 "
          >
            Address<span className="text-coral-700">*</span>
          </label>

          <input
            type="text"
            name="address"
            id="address"
            value={deliveryDetails.address}
            onChange={(e) => setDeliveryDetail("address", e.target.value)}
            className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 w-full rounded-none lg:rounded text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Your Address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-6">
          <div className="relative z-0 w-full   group">
            <label id="city" className="text-[8px] lg:text-base text-gray-500 ">
              City<span className="text-coral-700">*</span>
            </label>

            <input
              type="text"
              name="city"
              id="city"
              value={deliveryDetails.city}
              onChange={(e) => setDeliveryDetail("city", e.target.value)}
              className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 rounded-none lg:rounded w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="City"
              required
            />
          </div>

          <div className="relative z-0 w-full   group">
            <label
              id="region"
              className="text-[8px] lg:text-base text-gray-500 "
            >
              Region<span className="text-coral-700">*</span>
            </label>

            <input
              type="email"
              value={deliveryDetails.region}
              name="region"
              id="region"
              onChange={(e) => setDeliveryDetail("region", e.target.value)}
              className="block  h-10 lg:h-11 px-3  mt-1 lg:mt-3 rounded-none lg:rounded w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Select Region"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full group">
          <label
            id="postalCode"
            className="text-[8px] lg:text-base text-gray-500 "
          >
            Postal Code<span className="text-coral-700">*</span>
          </label>

          <input
            type="email"
            name="postalCode"
            id="postalCode"
            value={deliveryDetails.postalCode}
            onChange={(e) => setDeliveryDetail("postalCode", e.target.value)}
            className="block  h-10 lg:h-11 px-3 w-full  mt-1 lg:mt-3  rounded-none lg:roundedw-full text-xs lg:text-sm text-gray-900 bg-transparent border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Enter Postal Code"
            required
          />
        </div>
      </form>

      {!isLoadingShippingMethods && (
        <div className="mt-7">
          <div className="mb-3">
            <p className="text-xs lg:text-base"> Delivery Method </p>
          </div>

          <div className="flex flex-col gap-6  mt-1 lg:mt-3">
            {shipping_options?.map((method) => (
              <div
                key={method?.id}
                onClick={() => selectDeliveryMethod(method)}
                className="flex justify-between border-[1px] hover:cursor-pointer border-gray-300 p-3"
              >
                <div className="flex">
                  <div className="flex items-center">
                    <Circle active={deliveryMethod?.id === method.id} />
                  </div>

                  <div className="ml-2">
                    <p className="text-[10px] lg:text-sm"> {method.name} </p>
                    <p className="text-[10px] lg:text-sm"> {method.name} </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs lg:text-base font-semibold">
                    {formatCurrency(method?.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button
          clickAction={async () => {
            await addDeliveryAddress({
              cartId: customer?.metadata?.cartId,
              deliveryDetails,
              deliveryMethod,
            });
          }}
          width="full"
          title="Continue to Payment"
        />
      </div>
    </div>
  );
}
