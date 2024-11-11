"use client";
import { useCartStore } from "@/src/state/cart";
import { formatCurrency } from "@/utils/helpers/formatter";
import cn from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useCartShippingOptions } from "medusa-react";
import { useCustomerStore } from "@/src/state/customer";
import { useForm, SubmitHandler } from "react-hook-form";
import { add, isEmpty } from "lodash";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Country, IState, State } from "country-state-city";

import Async, { useAsync } from "react-select/async";

import CartSummary from "./CartSummary";
import Checkbox from "../ui/Checkbox";
import {
  useMediaQuery,
  MOBILE_BREAKPOINT,
} from "@/utils/hooks/useStyleWidthQuery";

const Circle = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-4 w-4 border-[0.70px] lg:border-[1px] rounded-full flex items-center justify-center"
    )}
  >
    {active && <div className="h-2 w-2 bg-[black] rounded-full" />}
  </div>
);

interface CheckoutDetails {
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: {
    value: string;
    isoCode: string;
    label?: string;
  };
  state: {
    value: string;
    isoCode: string;
    label?: string;
  };
}

const ZIP_COUNTRIES = [
  { value: "United States", code: "US" },
  { value: "Canada", code: "CA" },
  { value: "Australia", code: "AU" },
  { value: "Brazil", code: "BR" },
  { value: "India", code: "IN" },
  { value: "Mexico", code: "MX" },
  { value: "Germany", code: "DE" },
  { value: "Argentina", code: "AR" },
  { value: "South Africa", code: "ZA" },
  { value: "Nigeria", code: "NG" },
  { value: "Russia", code: "RU" },
  { value: "China", code: "CN" },
  { value: "Switzerland", code: "CH" },
  { value: "Malaysia", code: "MY" },
  { value: "United Arab Emirates", code: "AE" },
  { value: "Venezuela", code: "VE" },
  { value: "Pakistan", code: "PK" },
  { value: "Italy", code: "IT" },
  { value: "Indonesia", code: "ID" },
  { value: "Colombia", code: "CO" },
];

const transformStatesOfCountry = (states: IState[]) => {
  if (!states) return [];

  return states.map((state) => ({
    value: state.name,
    label: state.name,
  }));
};

const getAllCountries = () => {
  return Country.getAllCountries().map((country) => ({
    value: country.name,
    label: country.name,
    isoCode: country.isoCode,
  }));
};

export default function CheckoutForm() {
  const isSmall = useMediaQuery(MOBILE_BREAKPOINT);

  const { customer, updateBillingAddress } = useCustomerStore();
  const [isLocationVisible, setLocationVisibility] = useState(false);

  const { addDeliveryAddress } = useCartStore();

  const [shouldStoreCheckoutInfo, storeCheckoutInfo] = useState(
    !isEmpty(customer?.shipping_addresses)
  );

  const toggleLocationVisibility = () => {
    if (isLocationVisible) {
      setValue("address", "");
      setValue("address", "");
      setValue("city", "");
      setValue("postalCode", "");
      setValue("region", "");
      setValue("country", { value: "", isoCode: "", label: "" });
    }

    setLocationVisibility((visibility) =>
      visibility ? visibility : !isLocationVisible
    );
  };

  const { shipping_options, isLoading: isLoadingShippingMethods } =
    useCartShippingOptions(customer?.metadata?.cartId || "");

  const [deliveryMethod, selectDeliveryMethod] = useState(
    !isLoadingShippingMethods && shipping_options ? shipping_options[0] : null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutDetails>();

  const submitCheckoutDetails: SubmitHandler<CheckoutDetails> = async (
    data: CheckoutDetails
  ) => {
    if (shouldStoreCheckoutInfo) {
      await updateBillingAddress(data);
    }

    await addDeliveryAddress({
      cartId: customer?.metadata?.cartId,
      deliveryDetails: {
        ...data,
      },
      deliveryMethod,
    });
  };

  useEffect(() => {
    if (customer && customer?.shipping_addresses?.length > 0) {
      setValue(
        "fullname",
        `${customer?.shipping_addresses[0]?.first_name} ${customer?.shipping_addresses[0]?.last_name}`
      );
      setValue("city", customer?.shipping_addresses[0]?.city);
      setValue("postalCode", customer?.shipping_addresses[0]?.postal_code);
      setValue("region", customer?.shipping_addresses[0]?.region);
      setValue("address", customer?.shipping_addresses[0]?.address_1);
      setValue("phoneNumber", customer?.shipping_addresses[0]?.phone);
      setValue("email", customer?.email);
    }
  }, [customer]);

  const [selectedDestinationCityOption, setDestinationCityOption] =
    useState(null);

  const loadDestinationCityOptions = async (
    inputValue: string,
    callback: any
  ) => {
    if (inputValue) {
      try {
        const response = await fetch(`/api/location?location=${inputValue}`);
        const data = await response.json();

        let places = [];
        data?.data?.predictions?.map((place, i) => {
          places = [
            ...places,
            {
              value: place.description,
              label: place.description,
              place_id: place.place_id,
            },
          ];
        });

        callback(places);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [country, state] = watch(["country", "state"]);

  useEffect(() => {
    if (!selectedDestinationCityOption) return;

    (async () => {
      const response = await fetch(
        `/api/location/place?placeId=${selectedDestinationCityOption?.place_id}`
      );
      const { data } = await response.json();

      if (
        data?.result?.address_components &&
        data?.result?.address_components.length > 0
      ) {
        let address = "";

        data?.result?.address_components?.forEach((component) => {
          if (component?.types?.includes("street_number")) {
            address = `${component?.long_name} `;
          }

          if (component?.types?.includes("route")) {
            address = `${address} ${component.long_name} `;
          }

          if (component?.types?.includes("locality")) {
            setValue("city", component.long_name);
          }

          if (component?.types?.includes("postal_code")) {
            setValue("postalCode", component.long_name);
          }

          if (component?.types?.includes("administrative_area_level_1")) {
            setValue("region", component.long_name);
          }

          if (
            component?.types?.includes("country") ||
            component?.types?.includes("political")
          ) {
            setValue("country", {
              value: component.long_name,
              label: component.long_name,
              isoCode: component.short_name,
            });
          }

          if (component?.types?.includes("administrative_area_level_1")) {
            setValue("state", {
              value: component.long_name,
              label: component.long_name,
              isoCode: component.short_name,
            });
          }
        });

        setValue("address", address);

        if (!isLocationVisible) {
          toggleLocationVisibility();
        }
      }
    })();
  }, [selectedDestinationCityOption]);

  const isZipCode = useMemo(
    () => ZIP_COUNTRIES.find((item) => item.value === country?.value),
    [country]
  );

  const allStates = useMemo(
    () => State.getStatesOfCountry(country?.isoCode),
    [country?.isoCode]
  );

  return (
    <div className="flex flex-col gap-14 mt-6 mb-12 lg:mt-1 lg:grid lg:grid-cols-2 lg:gap-32">
      <div>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitCheckoutDetails)}
        >
          {/* <div className="relative z-0 w-full mb-4 lg:mb-8 group">
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
              className="block h-10 lg:h-11 px-3  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
              placeholder="Select Date"
              required
              disabled
            />
          </div> */}

          <div className="">
            <p className="text-[10px] lg:text-base">Delivery Details</p>
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
              {...register("fullname", { required: true })}
              className="block px-3 mt-1 rounded-none lg:mt-3 w-full h-10 lg:h-11 text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
              placeholder="Enter Full Name"
              required
            />

            {errors.fullname && (
              <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
            )}
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
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                className="block rounded-none h-10 lg:h-11 px-3  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                placeholder="Email Address"
                required
              />

              {errors.email && (
                <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
              )}
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
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                id="email"
                className="block  h-10 rounded-none lg:h-11 px-3  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                placeholder="Confirm Email Address"
                required
              />

              {errors.email && (
                <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
              )}
            </div>
          </div>

          <div className="relative z-0 w-full group">
            <label
              id="phoneNumber"
              className="text-[8px] lg:text-base text-gray-500 "
            >
              Phone Number<span className="text-coral-700">*</span>
            </label>

            <input
              type="number"
              {...register("phoneNumber", {
                required: true,
              })}
              id="phoneNumber"
              className="block rounded-none h-10 lg:h-11 px-3 placeholder-brown-dark-1500 mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
              placeholder="Phone Number (Only Digit)"
              required
            />

            {errors.phoneNumber && (
              <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
            )}
          </div>

          <div className="relative z-1 w-full group">
            <label
              id="autoFindUserLocation"
              className="text-[8px] lg:text-base text-gray-500 "
            >
              Find your location
            </label>

            <AsyncSelect
              cacheOptions
              className="text-xs text-trim lg:text-sm mt-2 text-gray-900 bg-[white]"
              defaultValue={selectedDestinationCityOption}
              onChange={setDestinationCityOption}
              loadOptions={loadDestinationCityOptions}
              id="autoFindUserLocation"
              placeholder={"Your address"}
              defaultOptions={[]}
              backspaceRemovesValue
              isClearable
              styles={{
                control: () => ({
                  height: isSmall ? "40px" : "45px",
                  border: isSmall ? "0.70px solid black" : "1px solid black",
                  fontFamily: "Neue Montreal",
                  fontSize: isSmall ? "12px" : "14px",
                  padding: "0 10px",
                  display: "flex",
                  justifyContent: "space-between",
                }),
                valueContainer: () => ({
                  borderRadius: 0,
                  display: "flex",
                  placeItems: "center",
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  ...{
                    color: "black",
                  },
                }),
                indicatorSeparator: (styles) => ({
                  ...styles,
                  ...{
                    display: "none",
                  },
                }),
                option: (styles) => ({
                  ...styles,
                  ...{
                    fontFamily: "Neue Montreal",
                    fontSize: isSmall ? "10px" : "12px",
                  },
                }),
                menuList: () => ({
                  background: "white",
                  maxHeight: "300px",
                  overflowY: "auto",
                  width: "100%",
                  zIndex: 99999,
                  position: "absolute",
                  border: isSmall ? "0.70px solid black" : "1px solid black",
                }),
              }}
            />

            <div className="mt-2">
              <p className="text-xs lg:text-sm">
                Can't find your location?{" "}
                <span
                  onClick={toggleLocationVisibility}
                  className="underline hover:cursor-pointer"
                >
                  Enter location.{" "}
                </span>{" "}
              </p>
            </div>
          </div>

          {isLocationVisible && (
            <div>
              <div className="relative z-0 w-full   group">
                <label
                  id="address"
                  className="text-[8px] lg:text-base text-gray-500 "
                >
                  Address<span className="text-coral-700">*</span>
                </label>

                <input
                  type="text"
                  id="address"
                  {...register("address", {
                    required: true,
                  })}
                  className="block rounded-none h-10 lg:h-11 px-3  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                  placeholder="Enter Your Address"
                  required
                />

                {errors.address && (
                  <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
                )}
              </div>

              <div className="grid grid-cols-2 mt-4 gap-2 lg:gap-6">
                <div className="relative z-0 w-full group">
                  <label
                    id="city"
                    className="text-[8px] lg:text-base text-gray-500 "
                  >
                    City<span className="text-coral-700">*</span>
                  </label>

                  <input
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                    className="block rounded-none h-10 lg:h-11 px-3 mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                    placeholder="City"
                    required
                  />

                  {errors.city && (
                    <p className="mt-1 text-coral-700 text-xs">
                      *Required Field
                    </p>
                  )}
                </div>

                <div className="relative w-full group">
                  <label
                    id="region"
                    className="text-[8px] lg:text-base text-gray-500 "
                  >
                    {isZipCode ? "State" : "Region"}{" "}
                    <span className="text-coral-700">*</span>
                  </label>

                  {isZipCode ? (
                    <Select
                      onChange={(result) => {
                        result &&
                          setValue("state", {
                            value: result?.value,
                            label: result?.label,
                            isoCode: result?.isoCode,
                          });
                      }}
                      options={transformStatesOfCountry(allStates)}
                      isClearable
                      value={state}
                      styles={{
                        control: () => ({
                          height: isSmall ? "40px" : "45px",
                          border: isSmall
                            ? "0.70px solid black"
                            : "1px solid black",
                          fontFamily: "Neue Montreal",
                          fontSize: isSmall ? "12px" : "14px",
                          padding: "0 10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }),
                        valueContainer: () => ({
                          borderRadius: 0,
                          display: "flex",
                          placeItems: "center",
                        }),
                        dropdownIndicator: (styles) => ({
                          ...styles,
                          ...{
                            color: "black",
                          },
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        option: (styles) => ({
                          ...styles,
                          ...{
                            fontFamily: "Neue Montreal",
                            fontSize: isSmall ? "10px" : "12px",
                          },
                        }),
                        menuList: () => ({
                          background: "white",
                          maxHeight: isSmall ? "200px" : "300px",
                          overflowY: "auto",
                          width: "100%",
                          zIndex: 99999,
                          position: "absolute",
                          border: isSmall
                            ? "0.70px solid black"
                            : "1px solid black",
                        }),
                      }}
                      className="mt-1 lg:mt-3"
                      placeholder="Select State"
                      required
                    />
                  ) : (
                    <div>
                      <input
                        type="text"
                        {...register("region", {
                          required: !isZipCode,
                        })}
                        className="block rounded-none h-10 lg:h-11 px-3 mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                        placeholder="Select Region"
                        required
                      />

                      {errors.region && (
                        <p className="mt-1 text-coral-700 text-xs">
                          *Required Field
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 mt-4 gap-2 lg:gap-6">
                <div className="relative z-0 w-full group">
                  <label
                    id="postalCode"
                    className="text-[8px] lg:text-base text-gray-500 "
                  >
                    {isZipCode ? "Zip Code" : "Postal Code"}{" "}
                    <span className="text-coral-700">*</span>
                  </label>

                  <input
                    type="text"
                    {...register("postalCode", {
                      required: true,
                    })}
                    className="block rounded-none h-10 lg:h-11 px-3 w-full  mt-1 lg:mt-3 w-full text-xs lg:text-sm text-gray-900 bg-transparent border-[0.70px] lg:border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0  "
                    placeholder="Enter Postal Code"
                    required
                  />

                  {errors.postalCode && (
                    <p className="mt-1 text-coral-700 text-xs">
                      *Required Field
                    </p>
                  )}
                </div>

                <div className="relative z-0 w-full group">
                  <label
                    id="region"
                    className="text-[8px] z-0 lg:text-base text-gray-500 "
                  >
                    Country<span className="text-coral-700">*</span>
                  </label>

                  <Select
                    onChange={(result) => {
                      result &&
                        setValue("country", {
                          value: result?.value,
                          label: result?.label,
                          isoCode: result?.isoCode,
                        });
                    }}
                    value={country}
                    options={getAllCountries()}
                    className="h-10 lg:h-11 z-0 mt-1 lg:mt-3"
                    placeholder="Select Country"
                    required
                    styles={{
                      control: () => ({
                        height: isSmall ? "40px" : "45px",
                        border: isSmall
                          ? "0.70px solid black"
                          : "1px solid black",
                        fontFamily: "Neue Montreal",
                        fontSize: isSmall ? "12px" : "14px",
                        padding: "0 10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }),
                      valueContainer: () => ({
                        borderRadius: 0,
                        display: "flex",
                        placeItems: "center",
                      }),
                      dropdownIndicator: (styles) => ({
                        ...styles,
                        ...{
                          color: "black",
                        },
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      option: (styles) => ({
                        ...styles,
                        ...{
                          fontFamily: "Neue Montreal",
                          fontSize: isSmall ? "12px" : "14px",
                        },
                      }),
                      menuList: () => ({
                        background: "white",
                        maxHeight: isSmall ? "200px" : "300px",
                        overflowY: "auto",
                        width: "100%",
                        zIndex: 99999,
                        position: "absolute",
                        border: isSmall
                          ? "0.70px solid black"
                          : "1px solid black",
                      }),
                    }}
                  />

                  {errors.region && (
                    <p className="mt-1 text-coral-700 text-xs">
                      *Required Field
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
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
                  className="flex justify-between border-[0.70px] lg:border-[1px] hover:cursor-pointer border-gray-300 p-3"
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

        <div className="mt-7">
          <div className="mb-3">
            <p className="text-sm lg:text-base"> Remember My Information </p>
          </div>

          <div className="flex flex-row gap-2  mt-1 lg:mt-3">
            <div>
              <Checkbox
                isActive={shouldStoreCheckoutInfo}
                selectCheckbox={() =>
                  storeCheckoutInfo(!shouldStoreCheckoutInfo)
                }
              />
            </div>

            <div className="flex items-center">
              <p className="text-brown-1500 text-xs lg:text-base">
                Save my information for future check out
              </p>
            </div>
          </div>
        </div>
      </div>

      <CartSummary
        deliveryOption={deliveryMethod}
        nextClickAction={handleSubmit(submitCheckoutDetails)}
      />
    </div>
  );
}
