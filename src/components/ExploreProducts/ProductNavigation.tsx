"use client";
import Button from "@/src/components/ui/button";
import FilterIcon from "@/src/assets/custom-icons/filters.svg";
import { useState } from "react";
import cn from "classnames";
import { useProductStore } from "@/src/state/product";
import { RxCaretDown } from "react-icons/rx";
import ProductsFilterSm from "../Drawers/ProductsFilterSm";

const tabs = [
  {
    title: "Fabric",
    key: "Fabric",
  },
  {
    title: "Dresses",
    key: "Dresses",
  },
  {
    title: "Events",
    key: "Events",
  },
];

const SORT_OPTIONS = [
  {
    key: "New Arrival",
  },
  {
    key: "Price: Low to High",
  },
  {
    key: "Price: High to Low",
  },
];

export default function ProductNavigation() {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const [sortMenu, setMenu] = useState({
    isVisible: false,
    sortValue: "New Arrival",
  });

  const { isFilterPaneVisible, toggleFilterPane } = useProductStore();

  return (
    <div className="layout">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-8">
          <div className="hidden lg:flex">
            {!isFilterPaneVisible && (
              <Button
                clickAction={toggleFilterPane}
                textClassname="text-sm lg:text-lg"
                icon={
                  <div className="mr-4">
                    <FilterIcon />
                  </div>
                }
                title="Filters"
              />
            )}
          </div>

          <div className="flex items-center">
            <ul className="flex flex-row">
              {tabs.map((tab, idx) => (
                <li key={tab.key}>
                  <div
                    style={{
                      padding:
                        idx === tabs.length - 1 || tab.title === tabs[0].title
                          ? "8px 0"
                          : "8px 32px",
                    }}
                    onClick={() => setCurrentTab(tab.key)}
                    className={cn(
                      "border-b-2 hover:cursor-pointer",
                      currentTab === tab.key
                        ? "border-brown-2100"
                        : "border-brown-1000 hover:border-brown-2100"
                    )}
                  >
                    <h1
                      className={cn(
                        "text-xs lg:text-base",
                        currentTab === tab.key
                          ? "text-brown-2100"
                          : "text-brown-1000"
                      )}
                    >
                      {tab.title}
                    </h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden lg:flex flex-row items-center gap-4">
          <p className="text-lg text-brown-1500"> Sort by: </p>

          <div className="relative">
            <div
              onClick={() =>
                setMenu((state) => ({
                  ...state,
                  ...{ isVisible: !state.isVisible },
                }))
              }
              className="w-[173px] h-[36px] border-[1px] border-brown-500 rounded-full px-5 flex items-center cursor-pointer"
            >
              <div className="flex flex-row w-full justify-between">
                <p className="text-brown-1500 text-sm">{sortMenu.sortValue}</p>

                <RxCaretDown size={22} />
              </div>
            </div>

            {sortMenu.isVisible && (
              <div
                style={{ zIndex: 999 }}
                className="absolute top-[37px] left-0 w-[173px] bg-brown-100 py-9 px-7 border-brown-500"
              >
                <ul className="flex flex-col gap-6">
                  {SORT_OPTIONS.map(({ key }) => (
                    <li key={key}>
                      <p
                        onClick={() =>
                          setMenu((state) => ({
                            ...state,
                            ...{ sortValue: key, isVisible: false },
                          }))
                        }
                        className={`hover:cursor-pointer text-base ${sortMenu.sortValue === key ? "text-brown-[#574F4B]" : "text-brown-[#928477]"}`}
                      >
                        {key}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <ProductsFilterSm />
      </div>
    </div>
  );
}
