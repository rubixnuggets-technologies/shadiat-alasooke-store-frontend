"use client";
import Image from "next/image";
import Icon from "../ui/icons";
import Link from "next/link";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import LgBreadcrumb from "./menu/LgBreadcrumb";
import { useState } from "react";
2
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

  return (
    <div className="h-[130px] flex items-center px-24 ">
      <div className="max-h-[56px] h-[56px] w-full ">
        <div className="flex flex-row justify-between ">
          <Link href={"/"} >
            <Image
              loader={ImageLoader}
              src={HERO_URL}
              alt="Alasooke"
              width={100}
              height={100}
            />
          </Link>

          <div className="flex items-center ">
            <ul className="flex flex-row">
              {LIST_ITEMS.map((item) => (
                <li key={item.name} className="inline mr-8">
                  <Link href={item.url}>
                    <p className="uppercase text-sm">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center flex-row">
            <div className="mr-8">
              <div className="flex flex-row border border-brown-1500 w-64 h-9 px-4">
                <div className="flex items-center mr-2">
                  <Icon type="search" className="text-red" />
                </div>

                <input
                  placeholder="Search Aso Oke, Collections..."
                  type="text "
                  id="search_text"
                  className="border-transparent text-brown-1500 focus:border-transparent focus:ring-0 w-full"
                />
              </div>
            </div>

            <div className="mr-8">
              <Icon type="cart" />
            </div>

            <div className="relative">
              <div className="hover:cursor-pointer" onClick={() => openMenu(!isMenuOpen)} >
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
        </div>
      </div>
    </div>
  );
};

export default Header;
