"use client";
import React, { useEffect } from "react";
import Button from "../../ui/button";
import Icon from "../../ui/icons";
import Link from "next/link";
import { useCustomerStore } from "@/src/state/customer";
import { useRouter } from "next/navigation";

const LgBreadcrumb = () => {
  const { customer, logoutCustomer, setCustomer } = useCustomerStore();

  const router = useRouter();

  const handleLogout = async () => {
    await logoutCustomer();

    router.push("/");
  };

  useEffect(() => {
    setCustomer();
  }, []);

  return (
    <div className="bg-brown-100 px-8 py-8 rounded-xl w-60">
      <ul className="flex flex-col gap-6">
        <li>
          <Link href={"/account"}>
            <div className="flex flex-row">
              <div className="mr-4">
                <Icon type="userNoUnderline" />
              </div>

              <p className="text-base text-brown-1500"> My Account </p>
            </div>
          </Link>
        </li>

        <li>
          <Link href={"/account/order-history"}>
            <div className="flex flex-row">
              <div className="mr-4">
                <Icon type="orders" />
              </div>

              <p className="text-base text-brown-1500"> My Order History </p>
            </div>
          </Link>
        </li>

        <li>
          <Link href={"/account/saved-items"}>
            <div className="flex flex-row">
              <div className="mr-4">
                <Icon type="heart" />
              </div>

              <p className="text-base text-brown-1500"> Saved Items </p>
            </div>
          </Link>
        </li>

        {customer ? (
          <li>
            <div
              onClick={handleLogout}
              className="hover:cursor-pointer flex flex-row"
            >
              <div className="mr-4">
                <Icon type="logout" />
              </div>

              <p className="text-base text-coral-700"> Log Out </p>
            </div>
          </li>
        ) : (
          <li>
            <div>
              <Link href={"/customer/login"}>
                <Button width="full" title="Log in" />
              </Link>

              <div className="mt-4">
                <Link href={"/customer/create-account"}>
                  <div className="hover:cursor-pointer">
                    <p className="text-center"> Create Account </p>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LgBreadcrumb;
