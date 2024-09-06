"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import cn from "classnames";
import RichTextComponent from "../../RichTextComponent";

export default function Page({ faq }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!isOpen)}
        className="border-brown-1500 border-2 px-6 h-11 flex items-center hover:cursor-pointer"
      >
        <div className="flex flex-row w-full justify-between">
          <p className="text-base text-brown-1500 font-bold">{faq?.title}</p>
          <div className={cn(isOpen ? "rotate-180" : "rotate-0")}>
            <IoIosArrowDown color="#928477" size={18} />
          </div>
        </div>
      </div>

      {isOpen && faq?.body && (
        <div className="mt-2 border-brown-1500 border-2 px-6 py-4 flex items-center">
          <RichTextComponent richText={faq.body} />
        </div>
      )}
    </div>
  );
}
