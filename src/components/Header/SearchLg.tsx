"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSearchStore } from "@/src/state/store";

const SearchLg = () => {
  const searchStore = useSearchStore();

  return (
    <div className="w-full flex justify-center mb-16">
      <div className="w-full flex flex-row justify-center">
        <input
          onChange={(e) => searchStore?.setSearchText(e.target.value)}
          placeholder="Search"
          className="border-b-[1px] w-[70%] h-14 text-2xl text-brown-1500 focus:outline-none"
        />

        <div className="flex items-center" >
          <div
            className="ml-4 hover:cursor-pointer"
            onClick={searchStore?.toggleSearch}
          >
            <IoCloseCircleOutline size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLg;
