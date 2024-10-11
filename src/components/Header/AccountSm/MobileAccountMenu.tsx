"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import Button from "../../ui/button";
import Icon from "../../ui/icons";
import { useCustomerStore } from "@/src/state/customer";

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const MobileAccountMenu = ({ state = "open", closeMenu }) => {
  const { customer } = useCustomerStore()

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
      document.querySelector("#menu-modal").showModal();
      setCurrentClasses(classes["open"]);

      setTimeout(() => {}, 600);
      // @ts-ignore
      document.querySelector("#close-menu").blur();
    } else {
      setCurrentClasses(classes["closed"]);
      setTimeout(() => {
        // @ts-ignore
        document.querySelector("#menu-modal").close();
      }, 600);
    }
  }, [state, classes, 600]);

  return (
    <div>
      <style type="text/css">{`
					#menu-modal::backdrop {
						background-color: rgba(0, 0, 0, 0);
						transition: background-color 600ms ease-in-out;
					}
					#menu-modal.open::backdrop {
						background-color: rgba(0, 0, 0, 0.5);
					}
			`}</style>

      <dialog
        id="menu-modal"
        className={`bg-[white] bottom-0 h-full left-0 right-0 top-0 m-0 min-h-full min-w-full p-0
        pb-10
        transition-transform
        ${currentClasses}
        `}
        style={{ transitionDuration: `600ms` }}
      >
        <div className="menu flex flex-col justify-between h-full px-5 pt-10 lg:px-0 lg:pt-16 h-full">
          <div>
            <div className="flex w-full flex-row justify-between">
              <h1 className="text-xl">Account Management</h1>

              <div
                onClick={closeMenu}
                className="hover:cursor-pointer"
                id="close-menu"
              >
                <IoMdClose size={28} />
              </div>
            </div>

             {/* Catch and trap the focus auto applied when model element is opened  */}
             <Link className="focus:outline-none" href="/">
              <p className="text-[1px]">a</p>
            </Link>

            <div className="mt-11">
              <ul className="flex flex-col gap-6">
                <li>
                  <div className="border-b-2 border-brown-1000 pb-3.5 hover:cursor-pointer">
                    <Link href={"/account"}>
                      <div className="flex flex-row">
                        <div className="mr-3">
                          <Icon type="user" />
                        </div>

                        <p className="capitalize text-base">My Account</p>
                      </div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="border-b-2 border-brown-1000 pb-3.5 hover:cursor-pointer">
                    <Link href={"/account/order-history"}>
                      <div className="flex flex-row">
                        <div className="mr-3">
                          <Icon type="orders" />
                        </div>

                        <p className="capitalize text-base">My Order History</p>
                      </div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="border-b-2 border-brown-1000 pb-3.5 hover:cursor-pointer">
                    <Link href={"/account/saved-items"}>
                      <div className="flex flex-row">
                        <div className="mr-3">
                          <Icon type="heart" />
                        </div>

                        <p className="capitalize text-base">Saved Items</p>
                      </div>
                    </Link>
                  </div>
                </li>
              </ul>

              <div>
                <div className="mt-11 w-full">
                  <Link href={"/customer/login"}>
                    <Button title="Log in" width="full" />
                  </Link>
                </div>

                <div className="mt-6 flex justify-center ">
                  <Link href={"/customer/create-account"}>
                    <p> Create an Account </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
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

              <ul className="mt-8">
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
        </div>
      </dialog>
    </div>
  );
};

export default MobileAccountMenu;
