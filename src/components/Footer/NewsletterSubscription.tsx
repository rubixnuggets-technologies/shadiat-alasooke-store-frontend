"use client";
import { addEmail } from "@/utils/actions/zoho";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewsletterSubscription() {
  const [subscriptionStatus, setSubscriptionStatus] = useState("IDLE");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    email: "";
  }>();

  const subscribeEmail: SubmitHandler<{ email: string }> = async (data) => {
    try {
      setSubscriptionStatus("LOADING");
      await addEmail(data?.email);

      setSubscriptionStatus("SUCCESS");
      setValue("email", "");
    } catch (error) {
      console.log(error);
    } finally {
      setSubscriptionStatus("SUCCESS");
    }
  };

  return (
    <div>
      <h1 className="text-[20px] lg:text-3xl text-brown-2100 text-center mb-2">
        Stay Updated with Shadiat Alasooke
      </h1>

      <div className="max-w-[236px] m-auto lg:max-w-full">
        <p className="text-center text-xs lg:text-base text-brown-2100">
          Subscribe to our newsletter for the latest updates, exclusive offers,
          and fashion tips.
        </p>
      </div>

      <div className="mt-6 lg:mt-10 flex justify-center">
        <form
          onSubmit={handleSubmit(subscribeEmail)}
          method="POST"
          className="border-[1px] w-full w-full mx-9 lg:w-[600px] h-9 lg:h-12 flex flex-row border-brown-2100"
        >
          <input
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
            disabled={subscriptionStatus === "LOADING"}
            type="email"
            className="w-full bg-brown-dark-100 focus:outline-none text-xs rounded-none placeholder-brown-dark-2000 lg:text-base text-2100 px-4"
            placeholder="Enter your email address"
          />

          <button
            type="submit"
            disabled={subscriptionStatus === "LOADING"}
            onClick={handleSubmit(subscribeEmail)}
            className="bg-brown-dark-2100 text-white text-xs lg:text-base font-bold w-44"
          >
            Susbscribe
          </button>
        </form>
      </div>
    </div>
  );
}
