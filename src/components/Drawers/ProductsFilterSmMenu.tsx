"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../ui/button";

const LIST_ITEMS = [
  {
    name: "aso oke",
    url: "/explore/shop-aso-oke",
  },
  {
    name: "ready to wear",
    url: "/explore/shop-rtw",
  },
  {
    name: "about",
    url: "/about",
  },
  {
    name: "book a consultation",
    url: "/book-a-consultation",
  },
  {
    name: "contact us",
    url: "/book-a-consultation",
  },
  {
    name: "faqs",
    url: "/book-a-consultation",
  },
];

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const ProductsFilterSm = ({ state = "open", closeMenu }) => {
  const classes = useMemo(
    () => ({
      open: ["open -translate-y-0 out-expo"],
      closed: ["closed -translate-y-full in-expo"],
    }),
    []
  );

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
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-xl">Filters</h1>

              <div onClick={closeMenu} className="hover:cursor-pointer" id="close-filter-menu">
                <IoMdClose size={28} />
              </div>
            </div>

             
          </div>

          
          <div className="layout flex flex-row justify-between"  >
            <Button title="Reset Filter" />


            <Button title="View Results" />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductsFilterSm;
