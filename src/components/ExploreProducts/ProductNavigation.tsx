"use client";
import Button from "@/src/components/ui/button";
import FilterIcon from "@/src/assets/custom-icons/filters.svg";
import { useState } from "react";
import cn from "classnames";

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

export default function ProductNavigation() {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);

  return (
    <div className="layout">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-8">
          <div>
            <Button
              icon={
                <div className="mr-4">
                  <FilterIcon />
                </div>
              }
              title="Filters"
            />
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
                          : "8px 32px"
                    }}
                    onClick={() => setCurrentTab(tab.key)}
                    className={cn(
                      "border-b-2 hover:cursor-pointer",
                      currentTab === tab.key
                        ? "border-brown-2100"
                        : "border-brown-1000 hover:border-brown-2100"
                    )}
                  >
                    <p
                      className={cn(
                        currentTab === tab.key
                          ? "text-brown-2100"
                          : "text-brown-1000"
                      )}
                    >
                      {tab.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex flex-row items-center gap-4">
            <p> Sort by: </p>

            <Button title="New Arrival" />
          </div>
        </div>
      </div>
    </div>
  );
}
