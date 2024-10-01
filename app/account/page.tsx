"use client"
import EditInformation from "@/src/components/forms/EditInformation";
import EditPassword from "@/src/components/forms/EditPassword";
import { FiEdit3 } from "react-icons/fi";

export default function Page() {
  return (
    <div className="pl-14 pt-8" >
      <div className="mb-11">
        <p className="text-2xl"> Welcome, </p>
      </div>

      <div className="max-w-96">
        <div className="flex justify-between">
          <p className="text-base">Personal Information</p>

          <div className="flex flex-row">
            <p className="text-sm">Edit</p>

            <FiEdit3 size={18} className="ml-2" />
          </div>
        </div>

        <div className="mb-16">
          <EditInformation />
        </div>
        <EditPassword />
      </div>
    </div>
  );
}
