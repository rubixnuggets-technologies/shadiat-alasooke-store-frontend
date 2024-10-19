"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../ui/button";
import { RxCaretDown } from "react-icons/rx";
import { useProductStore } from "@/src/state/product";
import AnimatedChevron from "../ui/AnimatedChevron";
import FilterAccordionItem from "../ui/FilterAccordionItem";

const SORT_OPTIONS = [
  {
    key: "NEW_ARRIVAL",
    value: "New Arrival",
  },
  {
    key: "PRICE_LOW_TO_HIGH",
    value: "Price: Low to High",
  },
  {
    key: "PRICE_HIGH_TO_LOW",
    value: "Price: High to Low",
  },
];

const ProductsFilterSm = ({
  state = "open",
  closeMenu,
  filters,
  itemsPerPage,
  collectionKey,
}) => {
  const classes = useMemo(
    () => ({
      open: ["open -translate-y-0 out-expo"],
      closed: ["closed -translate-y-full in-expo"],
    }),
    []
  );

  const [sortMenu, setMenu] = useState<
    Record<"isVisible" | "sortValue" | "sortKey", string | boolean>
  >({
    isVisible: false,
    sortValue: "New Arrival",
    sortKey: "NEW_ARRIVAL",
  });

  const [currentClasses, setCurrentClasses] = useState(classes[state]);

  useEffect(() => {
    if (state == "open") {
      // @ts-ignore
      document.querySelector("#menu-filter-modal").showModal();
      setCurrentClasses(classes["open"]);

      setTimeout(() => {}, 600);
      // @ts-ignore
      document.querySelector("#close-filter-menu").blur();
    } else {
      setCurrentClasses(classes["closed"]);
      setTimeout(() => {
        // @ts-ignore
        document.querySelector("#menu-filter-modal").close();
      }, 600);
    }
  }, [state, classes, 600]);

  const [productTags, setProductTags] = useState<Array<string>>([]);

  const [activeFilterTab, setActiveFilterTab] = useState<Array<string>>([
    "by_product_filters",
    "by_color_filters",
    "by_new_arrivals_filters",
  ]);

  const { queryProducts } = useProductStore();

  const applyProductTag = (tag: string) => {
    setProductTags((allTags) =>
      allTags.includes(tag)
        ? allTags.filter((productTag) => productTag !== tag)
        : [...allTags, tag]
    );
  };

  const toggleFilterTab = (filterTab: string) => {
    setActiveFilterTab((tab) =>
      activeFilterTab.includes(filterTab)
        ? tab.filter((tabItem) => filterTab !== tabItem)
        : [...tab, filterTab]
    );
  };

  useEffect(() => {
    if (collectionKey) {
      queryProducts({
        sort: sortMenu.sortKey,
        filter: productTags,
        limit: itemsPerPage,
        collectionId: collectionKey,
      });
    }
  }, [productTags, sortMenu.sortValue, collectionKey]);

  const resetFilters = () => {
    setProductTags([]);
    setMenu({
      isVisible: false,
      sortValue: "New Arrival",
      sortKey: "NEW_ARRIVAL",
    });
  };

  return (
    <div>
      <style type="text/css">{`
					#menu-filter-modal::backdrop {
						background-color: rgba(0, 0, 0, 0);
						transition: background-color 600ms ease-in-out;
					}
					#menu-filter-modal.open::backdrop {
						background-color: rgba(0, 0, 0, 0.5);
					}
			`}</style>

      <dialog
        id="menu-filter-modal"
        className={`bg-[white] bottom-0 h-full left-0 right-0 top-0 m-0 min-h-full min-w-full p-0
        pb-10
        transition-transform
        ${currentClasses}
        `}
        style={{ transitionDuration: `600ms` }}
      >
        <div className="flex flex-col justify-between h-full px-5 pt-10 lg:px-0 lg:pt-16 h-full">
          <div>
            <div className="flex w-full mb-9 flex-row justify-between">
              <h1 className="text-xl">Filters</h1>

              <div
                onClick={closeMenu}
                className="hover:cursor-pointer"
                id="close-filter-menu"
              >
                <IoMdClose size={28} />
              </div>
            </div>

            <div>
              <p className="text-sm">Sort by</p>

              <div className="relative mt-3.5">
                <div
                  onClick={() =>
                    setMenu((state) => ({
                      ...state,
                      ...{ isVisible: !state.isVisible },
                    }))
                  }
                  className="w-full h-[36px] border-[1px] border-brown-1000 rounded-full px-5 flex items-center cursor-pointer"
                >
                  <div className="flex flex-row w-full justify-between">
                    <p className="text-brown-1500 text-sm">
                      {sortMenu.sortValue}
                    </p>

                    <RxCaretDown size={22} />
                  </div>
                </div>

                {sortMenu.isVisible && (
                  <div
                    style={{ zIndex: 999 }}
                    className="absolute top-[37px] left-0 w-full bg-brown-light-100 py-9 px-7 border-brown-light-500"
                  >
                    <ul className="flex flex-col gap-6">
                      {SORT_OPTIONS.map(({ key, value }) => (
                        <li key={key}>
                          <p
                            onClick={() => {
                              setMenu((state) => ({
                                ...state,
                                ...{
                                  sortValue: value,
                                  sortKey: key,
                                  isVisible: false,
                                },
                              }));
                            }}
                            className={`hover:cursor-pointer text-base ${sortMenu.sortValue === key ? "text-brown-[#574F4B]" : "text-brown-[#928477]"}`}
                          >
                            {value}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div
                onClick={() => toggleFilterTab("by_product_filters")}
                className="flex flex-row justify-between"
              >
                <div className="flex items-center">
                  <h3 className="text-brown-2100 text-base hover:cursor-pointer">
                    {" "}
                    By Product{" "}
                  </h3>
                </div>

                <AnimatedChevron
                  filterTabs={activeFilterTab}
                  activeFilter="by_product_filters"
                />
              </div>

              <div>
                <FilterAccordionItem
                  accordionItemsType={"by_product_filters"}
                  activeFilterTab={activeFilterTab}
                  filters={filters}
                  clickAction={applyProductTag}
                  tags={productTags}
                />
              </div>
            </div>

            <div className="mt-6">
              <div
                onClick={() => toggleFilterTab("by_color_filters")}
                className="flex flex-row justify-between"
              >
                <div className="flex items-center">
                  <h3 className="text-brown-2100 text-base hover:cursor-pointer">
                    {" "}
                    By Color{" "}
                  </h3>
                </div>

                <AnimatedChevron
                  filterTabs={activeFilterTab}
                  activeFilter="by_color_filters"
                />
              </div>

              <div>
                <FilterAccordionItem
                  accordionItemsType={"by_color_filters"}
                  activeFilterTab={activeFilterTab}
                  filters={filters}
                  clickAction={applyProductTag}
                  tags={productTags}
                />
              </div>
            </div>

            <div className="mt-6">
              <div
                onClick={() => toggleFilterTab("by_new_arrivals_filters")}
                className="flex flex-row justify-between"
              >
                <div className="flex items-center">
                  <h3 className="text-brown-2100 text-base hover:cursor-pointer">
                    {" "}
                    By Color{" "}
                  </h3>
                </div>

                <AnimatedChevron
                  filterTabs={activeFilterTab}
                  activeFilter="by_new_arrivals_filters"
                />
              </div>

              <div>
                <FilterAccordionItem
                  accordionItemsType={"by_new_arrivals_filters"}
                  activeFilterTab={activeFilterTab}
                  filters={filters}
                  clickAction={applyProductTag}
                  tags={productTags}
                />
              </div>
            </div>
          </div>

          <div className="layout flex flex-row justify-between">
            <Button clickAction={resetFilters} title="Reset Filter" />

            <Button clickAction={closeMenu} title="View Results" />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductsFilterSm;
