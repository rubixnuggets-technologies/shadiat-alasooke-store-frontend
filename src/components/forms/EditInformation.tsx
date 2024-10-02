"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCustomerStore } from "@/src/state/customer";
import Button from "../ui/button";
import { useState } from "react";

interface UserInfo {
  email: "";
  fullname: "";
  phone: "";
}

export default function EditInformation() {
  const { customer, updateCustomerInfo } = useCustomerStore();
  const [operationStatus, setOperationStatus] = useState({
    status: "",
    message: "",
  });

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

  const handleOperationStatus = (status: string, message?: string) => {
    setOperationStatus({
      status,
      message: message || "",
    });

    setTimeout(() => {
      setOperationStatus({
        status: "",
        message: "",
      });
    }, 3000);
  };

  const submitInfoUpdate: SubmitHandler<UserInfo> = async (data) => {
    try {
      setOperationStatus({
        status: "PENDING",
        message: "",
      });

      await updateCustomerInfo({
        email: data.email,
        fullname: data.fullname,
        phone: data.phone,
      });

      handleOperationStatus("SUCCESS");
      setValue("email", "");
      setValue("phone", "");
      setValue("fullname", "");
    } catch (error) {
      console.log("auth err:", error);
    } finally {
      handleOperationStatus("");
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(submitInfoUpdate)}>
        <div className="form-group flex flex-col mt-6">
          <input
            type="text"
            className="form-control auth__input focus:outline-none"
            placeholder="FULL NAME*"
            {...register("fullname", {})}
          />
        </div>

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
            type="text"
            {...register("phone", {})}
            className="form-control auth__input focus:outline-none"
            placeholder="PHONE NUMBER*"
          />
        </div>

        <div className="mt-9">
          <Button
            type="submit"
            disabled={operationStatus.status === "PENDING"} 
            width="full"
            title={
              operationStatus?.status === "SUCCESS"
                ? "Changes Saved!"
                : "Save Changes"
            }
          />
        </div>
      </form>
    </div>
  );
}
