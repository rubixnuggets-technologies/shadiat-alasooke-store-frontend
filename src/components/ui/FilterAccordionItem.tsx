"use client";
import loadFeatures from "@/src/framer/load-features";
import { LazyMotion, AnimatePresence, m } from "framer-motion";
import cn from "classnames";

interface FilterAccordionItemProps {
  accordionItemsType:
    | "by_product_filters"
    | "by_color_filters"
    | "by_new_arrivals_filters";
  activeFilterTab: string[];
  filters: any[];
  clickAction: (filter: string) => void;
  tags: any[];
}

const FilterAccordionItem = ({
  accordionItemsType,
  activeFilterTab,
  filters,
  clickAction,
  tags,
}: FilterAccordionItemProps) => {
  if (!filters) return null;
  
  return (
    <LazyMotion strict features={loadFeatures}>
      <AnimatePresence>
        {activeFilterTab?.includes(accordionItemsType) && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-wrap flex-row gap-4 mt-4">
              {filters[accordionItemsType]?.map((filter) => (
                <li key={filter}>
                  <div
                    onClick={() => clickAction(filter)}
                    className={cn(
                      `h-9 px-4 hover:cursor-pointer  rounded-full flex items-center justify-center`,
                      tags.includes(filter)
                        ? "border-brown-dark-1500 border-[2.5px]"
                        : "border-brown-light-1500 border-[1px]"
                    )}
                  >
                    <p className="text-brown-dark-1500">{filter}</p>
                  </div>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
};

export default FilterAccordionItem;
