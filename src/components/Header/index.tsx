"use client";
import Image from "next/image";
import Icon from "../ui/icons";
import Link from "next/link";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import LgBreadcrumb from "./menu/LgBreadcrumb";
import { useState } from "react";
import { useSearchStore } from "@/src/state/store";
import Breadcrumb from "./BreacrumbSm/Breadcrumb";
import AccountMenu from "./AccountSm/AccountMenu";
import SearchLg from "./SearchLg";

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
  const searchStore = useSearchStore();

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
                  onClick={searchStore?.toggleSearch}
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

              <div className="mr-8">
                <Icon type="cart" />
              </div>

              <div className="relative">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => openMenu(!isMenuOpen)}
                >
                  <Icon type="user" />
                </div>

                {isMenuOpen && (
                  <div
                    className="absolute top-10 right-0"
                    style={{ zIndex: 9999 }}
                  >
                    <LgBreadcrumb />
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE HEADER ITEMS */}
            <div className="flex gap-6 lg:hidden items-center flex-row">
              <div>
                <div onClick={searchStore?.toggleSearch} className="cursor:pointer flex items-center mr-2">
                  <Icon type="search" className="text-red" />
                </div>
              </div>

              <div>
                <Icon type="cart" />
              </div>

              <AccountMenu />

              <div className="hover:cursor-pointer">
                <Breadcrumb />
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchStore.isOpen && (
         <SearchLg />
      )}
    </div>
  );
};

export default Header;
