"use client";
import { useCallback, useState } from "react";
import FilterIcon from "@/src/assets/custom-icons/filters.svg";
import ProductsFilterSmMenu from "./ProductsFilterSmMenu";

const ProductsFilterSm = ({ filters, collectionKey, itemsPerPage }) => {
  const [menuState, setMenuState] = useState("closed");

  /**
   * Toggle menu open or closed
   */
  const toggleMenu = useCallback(
    (toState: string = null) => {
      if (toState == null) {
        toState = menuState == "open" ? "closed" : "open";
      }
      setMenuState(toState);
    },
    [menuState]
  );

  return (
    <div className="">
      <div
        onClick={() => toggleMenu()}
        className="hover:cursor-pointer flex flex-row items-center lg:hidden"
      >
        <div className="mr-3">
          <FilterIcon />
        </div>

        <p className="text-xs">Filters</p>
      </div>

      <ProductsFilterSmMenu
        filters={filters}
        itemsPerPage={itemsPerPage}
        collectionKey={collectionKey}
        closeMenu={() => toggleMenu()}
        state={menuState}
      />
    </div>
  );
};

export default ProductsFilterSm;
