"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../ui/button";
import { RxCaretDown } from "react-icons/rx";

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

const ProductsFilterSm = ({ state = "open", closeMenu }) => {
  const classes = useMemo(
    () => ({
      open: ["open -translate-y-0 out-expo"],
      closed: ["closed -translate-y-full in-expo"],
    }),
    []
  );

  const [sortMenu, setMenu] = useState({
    isVisible: false,
    sortValue: "New Arrival",
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

            <div className="mt-6">
              <h3 className="text-brown-2100 text-base"> By Color </h3>
            </div>

            <div className="mt-6">
              <h3 className="text-brown-2100 text-base"> By New Arrivals </h3>
            </div>

            <div className="mt-6">
              <h3 className="text-brown-2100 text-base"> By Price </h3>
            </div>
          </div>

          <div className="layout flex flex-row justify-between">
            <Button title="Reset Filter" />

            <Button title="View Results" />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductsFilterSm;
