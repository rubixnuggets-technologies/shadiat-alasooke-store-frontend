"use client";
import Image from "next/image";
import Icon from "../ui/icons";
import Link from "next/link";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import LgBreadcrumb from "./menu/LgBreadcrumb";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import MedusaClient from "@/utils/Medusa/MedusaClient";

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

const Header = ({
  handleSearchResultsResponse,
}: {
  handleSearchResultsResponse: (data: any) => void;
}) => {
  const [isMenuOpen, openMenu] = useState(false);
  const [isSearchOpen, openSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    try {
      const { hits } = await MedusaClient.products.search({ q: searchText });

      handleSearchResultsResponse(hits);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="h-[130px] flex items-center px-24 ">
        <div className="max-h-[56px] h-[56px] w-full ">
          <div className="flex flex-row justify-between ">
            <Link href={"/"}>
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
                <div
                  onClick={() => openSearch(true)}
                  className="flex flex-row border border-brown-1500 w-64 h-9 px-4"
                >
                  <div className="flex items-center mr-2">
                    <Icon type="search" className="text-red" />
                  </div>

                  <input
                    placeholder="Search Aso Oke, Collections..."
                    type="text "
                    id="search_text"
                    disabled
                    className="border-transparent text-brown-1500 focus:border-transparent focus:ring-0 w-full"
                  />
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
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="w-full flex justify-center mb-16">
          <div className="w-full flex flex-row justify-center">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="border-b-2 w-[70%] h-14 text-2xl text-brown-1500"
            />

            <button onClick={handleSearch}>Search</button>

            <div
              className="ml-4 hover:cursor-pointer"
              onClick={() => {
                openSearch(false);
                handleSearchResultsResponse(null);
              }}
            >
              <IoCloseCircleOutline size={32} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
