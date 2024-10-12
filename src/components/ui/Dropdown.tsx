"use client"

import loadFeatures from "@/src/framer/load-features";
import { LazyMotion, AnimatePresence, m } from "framer-motion";

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

export default Dropdown;