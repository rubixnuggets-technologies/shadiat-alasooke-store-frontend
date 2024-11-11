"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import Dropdown from "../ui/Dropdown";
import useOutsideClickDetector from "@/utils/hooks/useOutsideClickDetector";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { preOrderNative } from "@/utils/actions/zoho";
import PreorderSuccess from "../Modals/PreorderSuccess";

interface OrderInfo {
  email: string;
  fullname: string;
  phone: string;
  additionalMessage: string;
  collectionType: string;
  collectionMethod: string;
}

export default function PreOrderForm({ productId }: { productId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderInfo>();

  const [contactMethod, setContactMethod] = useState({
    isVisible: false,
    value: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    "IDLE" | "SUCCESS" | "ERROR" | "LOADING"
  >("IDLE");

  const [isModalVisible, setModalVisibility] = useState(false);

  const toggleContactMethod = () => {
    setContactMethod((state) => ({
      ...state,

      isVisible: !state.isVisible,
    }));
  };

  const contactDropdownRef = useOutsideClickDetector(() =>
    setContactMethod((state) => ({
      ...state,

      isVisible: false,
    }))
  );

  const submitOrderForm: SubmitHandler<OrderInfo> = async (data) => {
    setSubmissionStatus("LOADING");

    try {
      await preOrderNative({
        Email: data?.email,
        Name: data?.fullname,
        Preferred_Contact_Method: contactMethod.value || "Email",
        Additional_Message: data?.additionalMessage,
        Collection_Type: data?.collectionType,
        Phone_Number: data?.phone,
        Product_Link: `${process.env.NEXT_PUBLIC_MEDUSA_ENDPOINT}/a/products/${productId}`,
      });

      setSubmissionStatus("SUCCESS");
      reset();
      setModalVisibility(true);
    } catch (error) {
      setSubmissionStatus("ERROR");

      console.log("auth err:", error);
    }
  };

  return (
    <div>
      <PreorderSuccess
        open={isModalVisible}
        onClose={() => setModalVisibility(!isModalVisible)}
      />

      <form
        action=""
        className="flex flex-col gap-6 lg:gap-8 mt-4"
        onSubmit={handleSubmit(submitOrderForm)}
      >
        <div className="form-group flex flex-col">
          <input
            type="text"
            disabled={submissionStatus === "LOADING"}
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
              disabled={submissionStatus === "LOADING"}
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
              disabled={submissionStatus === "LOADING"}
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
          ref={contactDropdownRef}
          className="relative form-group border-b-0 flex w-full flex-col"
        >
          <div
            onClick={toggleContactMethod}
            className="flex flex-row justify-between text-xs border-0 w-full hover:cursor-pointer auth__input focus:outline-none"
          >
            <div className="flex items-center">
              <p className="text-xs lg:text-base">
                {contactMethod?.value || "PREFERRED CONTACT METHOD*"}
              </p>
            </div>

            <div className="flex items-center">
              <IoChevronDown size={18} />
            </div>
          </div>

          <Dropdown
            listItems={["Email", "Phone (WhatsApp)"]}
            onSelect={(value: string) =>
              setContactMethod({ isVisible: false, value })
            }
            open={contactMethod.isVisible}
          />
        </div>

        <div className="form-group flex flex-col">
          <input
            type="text"
            disabled={submissionStatus === "LOADING"}
            className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
            placeholder="COLLECTION TYPE*"
            {...register("collectionType", {
              required: true,
            })}
          />
        </div>

        <div className="form-group flex flex-col">
          <input
            type="text"
            disabled={submissionStatus === "LOADING"}
            className="form-control text-xs lg:text-base border-b-[0.50px] lg:border-b-[1px] auth__input focus:outline-none"
            placeholder="ADDITIONAL MESSAGE"
            {...register("additionalMessage")}
          />
        </div>

        <div className="mt-4 lg:mt-9">
          <Button
            disabled={submissionStatus === "LOADING"}
            type="submit"
            width="full"
            title={"Send Order"}
          />
        </div>
      </form>
    </div>
  );
}
