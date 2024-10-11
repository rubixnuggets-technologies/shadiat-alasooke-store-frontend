"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";

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

const MobileHeaderMenu = ({ state = "open", closeMenu }) => {
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
      document.querySelector("#menu-header-modal").showModal();
      setCurrentClasses(classes["open"]);

      setTimeout(() => {}, 600);
      // @ts-ignore
      document.querySelector("#close-header-menu").blur();
    } else {
      setCurrentClasses(classes["closed"]);
      setTimeout(() => {
        // @ts-ignore
        document.querySelector("#menu-header-modal").close();
      }, 600);
    }
  }, [state, classes, 600]);

  return (
    <div>
      <style type="text/css">{`
					#menu-header-modal::backdrop {
						background-color: rgba(0, 0, 0, 0);
						transition: background-color 600ms ease-in-out;
					}
					#menu-header-modal.open::backdrop {
						background-color: rgba(0, 0, 0, 0.5);
					}
			`}</style>

      <dialog
        id="menu-header-modal"
        className={`bg-[white] focus:outline-none outline-none bottom-0 h-full left-0 right-0 top-0 m-0 min-h-full min-w-full p-0
        pb-10
        transition-transform
        ${currentClasses}
        `}
        style={{ transitionDuration: `600ms` }}
      >
        <div className="flex flex-col justify-between h-full px-5 pt-8 h-full">
          <div>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-xl">Menu</h1>

              <div
                onClick={closeMenu}
                className="hover:cursor-pointer"
                id="close-header-menu"
              >
                <IoMdClose size={28} />
              </div>
            </div>

            {/* Catch and trap the focus auto applied when model element is opened  */}
            <Link className="focus:outline-none" href="/">
              <p className="text-[1px]">a</p>
            </Link>

            <div className="mt-8">
              <ul className="flex flex-col gap-6">
                {LIST_ITEMS.map((item, idx) => (
                  <li key={idx}>
                    <div className="border-b-[1px] border-brown-light-1000 pb-3.5 hover:cursor-pointer">
                      <Link href={item.url}>
                        <p className="uppercase text-base">{item.name}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Link href="/">
              <div className="relative w-16 h-8 lg:w-[100px] lg:h-[100px]">
                <Image
                  src={HERO_URL}
                  alt="Shadiat Alasooke"
                  loader={ImageLoader}
                  fill
                  className="absolute object-cover"
                />
              </div>
            </Link>

            <p className="text-brown-2100 text-xs lg:text-base mt-2.5 lg:mt-8">
              Crafting Tradition with <br /> Modern Elegance.
            </p>

            <ul className="mt-6">
              <li>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="uppercase text-xs lg:text-base ">
                    get in touch
                  </p>
                  <p className="text-[10px] lg:text-base">
                    Lagos: +234 803 462 6067
                  </p>
                  <p className="text-[10px] lg:text-base">
                    Abuja: +234 911 401 9172
                  </p>
                  <p className="text-[10px] lg:text-base">
                    info@shadiatalasooke.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MobileHeaderMenu;
