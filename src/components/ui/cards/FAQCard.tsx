"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import RichTextComponent from "../../RichTextComponent";
import loadFeatures from "@/src/framer/load-features";
import { m, LazyMotion, AnimatePresence } from "framer-motion";

export default function Page({ faq }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!isOpen)}
        className="border-brown-dark-1500 border-[1px] px-6 h-11 flex items-center hover:cursor-pointer"
      >
        <div className="flex flex-row w-full justify-between">
          <p className="text-base text-brown-dark-1500 font-bold">
            {faq?.title}
          </p>

          <LazyMotion strict features={loadFeatures}>
            <m.div
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
            >
              <IoIosArrowDown color="#928477" size={18} />
            </m.div>
          </LazyMotion>
        </div>
      </div>

      <LazyMotion strict features={loadFeatures}>
        <AnimatePresence>
          {isOpen && faq?.body && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 border-brown-dark-1500 border-[1px] px-6 py-4 flex items-center"
            >
              <RichTextComponent richText={faq.body} />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
