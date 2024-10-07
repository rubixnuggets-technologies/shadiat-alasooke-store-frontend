"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCustomerStore } from "@/src/state/customer";
import Button from "../ui/button";

interface OrderInfo {
  email: string;
  fullname: string;
  phone: string;
  additionalMessage: string;
  collectionType: string;
  collectionMethod: string;
}

export default function PreOrderForm() {
  const { customer, updateCustomerInfo } = useCustomerStore();

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

  return (
    <div>
      <form action="" onSubmit={handleSubmit(submitOrderForm)}>
        <div className="form-group flex flex-col mt-6">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="FULL NAME*"
            {...register("fullname", {
              required: true,
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-6">
          <div className="form-group flex flex-col mt-8">
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              className="form-control auth__input focus:outline-none"
              placeholder="EMAIL ADDRESS*"
            />

            {errors.email && (
              <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
            )}
          </div>

          <div className="form-group flex flex-col mt-8">
            <input
              type="number"
              {...register("phone", {
                required: true,
              })}
              className="form-control auth__input focus:outline-none"
              placeholder="PHONE NUMBER (WHATSAPP)*"
            />

            {errors.phone && (
              <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
            )}
          </div>
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="PREFERRED CONTACT METHOD*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="COLLECTION TYPE*"
          />
        </div>

        <div className="form-group flex flex-col mt-8">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="ADDITIONAL MESSAGE"
          />
        </div>

        <div className="mt-9">
          <Button type="submit" width="full" title={"Send Order"} />
        </div>
      </form>
    </div>
  );
}
