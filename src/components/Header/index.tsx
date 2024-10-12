"use client";
import Image from "next/image";
import Icon from "../ui/icons";
import Link from "next/link";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import LgBreadcrumb from "./menu/LgBreadcrumb";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/src/state/store";
import Breadcrumb from "./BreacrumbSm/Breadcrumb";
import AccountMenu from "./AccountSm/AccountMenu";
import SearchLg from "./SearchLg";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import loadFeatures from "@/src/framer/load-features";
import { useCartStore } from "@/src/state/cart";
import { useCustomerStore } from "@/src/state/customer";
import useOutsideClickDetector from "@/utils/hooks/useOutsideClickDetector";
import { usePathname } from "next/navigation";

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
];

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const Header = () => {
  const [isMenuOpen, openMenu] = useState(false);
  const { isOpen, toggleSearch } = useSearchStore();
  const { cart } = useCartStore();
  const { customer } = useCustomerStore();

  const pathName = usePathname();

  const dropdownRef = useOutsideClickDetector(() => openMenu(false));

  useEffect(() => {
    // if (searchStore?.isOpen) {
      // toggleSearch({ isVisible: false });
    // }
  }, [pathName]);

  return (
    <div className="">
      <div className="h-[80px] lg:h-[100px] flex items-center layout">
        <div className="max-h-[56px] h-[56px] w-full ">
          <div className="flex flex-row justify-between ">
            <Link href={"/"}>
              <div className="relative w-16 h-8 lg:w-[116px] lg:h-[56px]">
                <Image
                  src={HERO_URL}
                  alt="Shadiat Alasooke"
                  loader={ImageLoader}
                  fill
                  className="absolute object-cover"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center ">
              <ul className="flex flex-row">
                {LIST_ITEMS.map((item) => (
                  <li key={item.name} className="inline mr-8">
                    <Link href={item.url}>
                      <p className="uppercase text-base">{item.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex items-center flex-row">
              <div className="mr-8">
                <div
                  onClick={toggleSearch}
                  className="flex flex-row items-center border border-brown-1500 w-64 h-9 px-4"
                >
                  <div className="flex items-center mr-2">
                    <Icon type="search" className="text-red" />
                  </div>

                  <p className="text-brown-2000">
                    Search Aso Oke, Collections...
                  </p>
                </div>
              </div>

              <div className="relative mr-8">
                <Link href="/cart">
                  <Icon type="cart" />
                </Link>

                {(cart || customer) && (
                  <div className="absolute -top-2 -right-4 h-5 w-5 bg-[#3E3832] flex items-center justify-center rounded-full">
                    <p className="text-xs text-white">
                      {cart?.items?.length || 0}
                    </p>
                  </div>
                )}
              </div>

              <div ref={dropdownRef} className="relative">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => openMenu(!isMenuOpen)}
                >
                  <Icon type="user" />
                </div>

                <LazyMotion strict features={loadFeatures}>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <m.div
                        initial={{ opacity: 0, display: "none" }}
                        animate={{ opacity: 1, display: "flex" }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0, display: "none" }}
                        className="absolute top-10 right-0"
                        style={{ zIndex: 9999 }}
                      >
                        <LgBreadcrumb />
                      </m.div>
                    )}
                  </AnimatePresence>
                </LazyMotion>
              </div>
            </div>

            {/* MOBILE HEADER ITEMS */}
            <div className="flex gap-6 lg:hidden  flex-row">
              <div
                onClick={toggleSearch}
                className="cursor:pointer flex items-center"
              >
                <Icon type="search" className="text-red" />
              </div>

              <Link href={"/cart"}>
                <div className="relative">
                  <Icon type="cart" />

                  {(cart || customer) && (
                    <div className="absolute -top-2 -right-4 h-5 w-5 bg-[#3E3832] flex items-center justify-center rounded-full">
                      <p className="text-xs text-white">
                        {cart?.items?.length || 0}
                      </p>
                    </div>
                  )}
                </div>
              </Link>

              <AccountMenu />

              <div className="flex hover:cursor-pointer">
                <Breadcrumb />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LazyMotion strict features={loadFeatures}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <SearchLg />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default Header;
