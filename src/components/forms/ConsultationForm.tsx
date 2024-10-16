"use client";
import Button from "@/src/components/ui/button";
import loadFeatures from "@/src/framer/load-features";
import useOutsideClickDetector from "@/utils/hooks/useOutsideClickDetector";
import { LazyMotion, AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

interface ConsultationDetails {
  name: string;
  email: string;
  phoneNumber: string;
  additionalMessage: string;
}

interface DropdownProps {
  onSelect: (value: string) => void;
  listItems: Array<string>;
  open: boolean;
}

const Dropdown = ({ onSelect, listItems, open }: DropdownProps) => (
  <LazyMotion strict features={loadFeatures}>
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "flex" }}
          exit={{ opacity: 0, display: "none" }}
          style={{ zIndex: 9999 }}
          transition={{ duration: 0.1 }}
          className="absolute top-12 right-0 bg-white px-8 py-6  shadow-lg"
        >
          <ul className="flex flex-col gap-6">
            {listItems?.map((item) => (
              <li
                key={item}
                onClick={() => {
                  onSelect(item);
                }}
              >
                <p className="hover:cursor-pointer text-sm">{item}</p>
              </li>
            ))}
          </ul>
        </m.div>
      )}
    </AnimatePresence>
  </LazyMotion>
);

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

  const [consultationType, setConsultationType] = useState({
    isVisible: false,
    value: "",
  });

  const [consultant, setConsultant] = useState({
    isVisible: false,
    value: "",
  });

  const toggleConsulationType = () => {
    setConsultationType((state) => ({
      ...state,

      isVisible: !consultationType.isVisible,
    }));
  };

  const toggleConsultant = () => {
    setConsultant((state) => ({
      ...state,

      isVisible: !consultant.isVisible,
    }));
  };

  const consultantDropdownRef = useOutsideClickDetector(() =>
    setConsultant((state) => ({
      ...state,

      isVisible: false,
    }))
  );
  
  const consultationTypeDropdownRef = useOutsideClickDetector(() =>
    setConsultationType((state) => ({
      ...state,

      isVisible: false
    }))
  );

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
            className="text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
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
            className="text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
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
            className="text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="PHONE NUMBER*"
          />

          {errors.phoneNumber && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div
          ref={consultantDropdownRef}
          className="relative form-group border-b-0 flex w-full flex-col"
        >
          <div
            onClick={toggleConsultant}
            className="flex flex-row justify-between text-xs border-0 w-full hover:cursor-pointer auth__input focus:outline-none"
          >
            <div className="flex items-center">
              <p>
                {consultant.value ? consultant.value : "PICK A CONSULTANT*"}{" "}
              </p>
            </div>

            <div className="flex items-center">
              <IoChevronDown size={18} />
            </div>
          </div>

          <Dropdown
            listItems={["Creative Assistance", "Creative Director"]}
            onSelect={(value: string) =>
              setConsultant({ isVisible: consultant.isVisible, value })
            }
            open={consultant.isVisible}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-6">
          <div className="form-group border-b-0 flex w-full flex-col">
            <input
              type="date"
              className="text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
              onChange={(e) => {}}
              placeholder="DATE FOR CONSULTATION*"
            />
          </div>

          <div className="form-group border-b-0 flex w-full flex-col">
            <input
              type="time"
              className="text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
              onChange={(e) => {}}
              placeholder="TIME FOR CONSULTATION*"
            />
          </div>
        </div>

        <div
          // ref={consultationTypeDropdownRef}
          className="relative form-group border-b-0 flex w-full flex-col"
        >
          <div
            onClick={toggleConsulationType}
            className="flex flex-row justify-between text-xs border-0 hover:cursor-pointer w-full auth__input focus:outline-none"
          >
            <div className="flex items-center">
              <p className="text-xs lg:text-sm" >
                {consultationType.value
                  ? consultationType.value
                  : "CONSULTATION TYPE*"}{" "}
              </p>
            </div>

            <div className="flex items-center">
              <IoChevronDown size={18} />
            </div>
          </div>

          <Dropdown
            listItems={["One-on One", "Virtual"]}
            onSelect={(value) =>
              setConsultationType({
                isVisible: consultationType.isVisible,
                value,
              })
            }
            open={consultationType.isVisible}
          />
        </div>

        <div className="form-group border-b-0 flex w-full flex-col">
          <input
            type="text"
            {...register("additionalMessage", {})}
            className="placeholder-[#181615] text-xs lg:text-sm border-0 w-full auth__input focus:outline-none"
            onChange={(e) => {}}
            placeholder="ADDITIONAL MESSAGE*"
          />

          {errors.phoneNumber && (
            <p className="mt-1 text-coral-700 text-xs">*Required Field</p>
          )}
        </div>

        <div className="mt-7">
          <Button type="submit" width="full" title="Book A Consultation" />
        </div>
      </form>
    </div>
  );
}
