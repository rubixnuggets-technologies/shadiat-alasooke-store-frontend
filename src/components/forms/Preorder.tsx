"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import Dropdown from "../ui/Dropdown";
import useOutsideClickDetector from "@/utils/hooks/useOutsideClickDetector";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

interface OrderInfo {
  email: string;
  fullname: string;
  phone: string;
  additionalMessage: string;
  collectionType: string;
  collectionMethod: string;
}

export default function PreOrderForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    email: "";
    fullname: "";
    phone: "";
  }>();

  const submitOrderForm: SubmitHandler<OrderInfo> = async (data) => {
    try {
    } catch (error) {
      console.log("auth err:", error);
    } finally {
    }
  };

  const [collection, setCollection] = useState({
    isVisible: false,
    value: "",
  });

  const toggleCollection = () => {
    setCollection((state) => ({
      ...state,

      isVisible: !collection.isVisible,
    }));
  };

  const collectionDropdownRef = useOutsideClickDetector(() =>
    setCollection((state) => ({
      ...state,

      isVisible: false,
    }))
  );

  return (
    <form
      action=""
      className="flex flex-col gap-6 lg:gap-8 mt-4"
      onSubmit={handleSubmit(submitOrderForm)}
    >
      <div className="form-group flex flex-col">
        <input
          type="text"
          className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
          placeholder="FULL NAME*"
          {...register("fullname", {
            required: true,
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 lg:gap-6">
        <div className="form-group flex flex-col">
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
            className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
            placeholder="EMAIL ADDRESS*"
          />

          {errors.email && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div className="form-group flex flex-col">
          <input
            type="number"
            {...register("phone", {
              required: true,
            })}
            className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
            placeholder="PHONE NUMBER (WHATSAPP)*"
          />

          {errors.phone && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>
      </div>

      <div
        ref={collectionDropdownRef}
        className="relative form-group border-b-0 flex w-full flex-col"
      >
        <div
          onClick={toggleCollection}
          className="flex flex-row justify-between text-xs border-0 w-full hover:cursor-pointer auth__input focus:outline-none"
        >
          <div className="flex items-center">
            <p>
              {collection.value
                ? collection.value
                : "PREFERRED CONTACT METHOD*"}
            </p>
          </div>

          <div className="flex items-center">
            <IoChevronDown size={18} />
          </div>
        </div>

        <Dropdown
          listItems={["Email", "Phone (WhatsApp)"]}
          onSelect={(value: string) =>
            setCollection({ isVisible: collection.isVisible, value })
          }
          open={collection.isVisible}
        />
      </div>

      <div className="form-group flex flex-col">
        <input
          type="text"
          className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
          placeholder="COLLECTION TYPE*"
        />
      </div>

      <div className="form-group flex flex-col">
        <input
          type="text"
          className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
          placeholder="ADDITIONAL MESSAGE"
        />
      </div>

      <div className="mt-4 lg:mt-9">
        <Button type="submit" width="full" title={"Send Order"} />
      </div>
    </form>
  );
}
