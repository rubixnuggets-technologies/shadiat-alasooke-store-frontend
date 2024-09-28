"use client";
import Button from "@/src/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

interface ConsultationDetails {
  name: string;
  email: string;
  phoneNumber: string;
}

export default function ConsultationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConsultationDetails>();

  const submiForm: SubmitHandler<ConsultationDetails> = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-row mt-7">
      <form
        onSubmit={handleSubmit(submiForm)}
        className="flex flex-col gap-4 w-full"
        action=""
      >
        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            className="text-xs border-0 w-full auth__input focus:outline-none"
            {...register("name", {
              required: true,
            })}
            placeholder="FULL NAME*"
          />

          {errors.name && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="email"
            className="text-xs border-0 w-full auth__input focus:outline-none"
            {...register("email", {
              required: true,
            })}
            placeholder="EMAIL ADDRESS*"
          />

          {errors.email && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            {...register("phoneNumber", {
              required: true,
            })}
            className="text-xs border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="PHONE NUMBER*"
          />

          {errors.phoneNumber && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            className="text-xs border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="PICK A CONSULTANT*"
          />
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            className="text-xs border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="DATE FOR CONSULTATION*"
          />
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            className="text-xs border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="CONSULTATION TYPE*"
          />
        </div>

        <div className="mt-7">
          <Button type="submit" width="full" title="Book A Consultation" />
        </div>
      </form>
    </div>
  );
}
