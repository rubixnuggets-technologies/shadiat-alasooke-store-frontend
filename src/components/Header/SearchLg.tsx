"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSearchStore } from "@/src/state/store";
import { IoMdClose } from "react-icons/io";

const SearchLg = () => {
  const searchStore = useSearchStore();

  return (
    <div className="layout">
      <div className="w-full flex justify-center mb-16">
        <div className="w-full flex flex-row justify-center">
          <input
            onChange={(e) => searchStore?.setSearchText(e.target.value)}
            placeholder="Search"
            style={{ fontFamily: "Playfair Display" }}
            className="auth__input border-b-[1px] w-full lg:w-[70%] h-10 lg:h-14 text-xl lg:text-2xl text-brown-1500 focus:outline-none"
          />

          <div className="hidden lg:flex items-center">
            <div
              className="ml-4 hover:cursor-pointer"
              onClick={searchStore?.toggleSearch}
            >
              <IoCloseCircleOutline size={32} />
            </div>
          </div>

          <div className="flex lg:hidden items-center">
            <div
              className="ml-4 hover:cursor-pointer"
              onClick={searchStore?.toggleSearch}
            >
              <IoMdClose size={26} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLg;
