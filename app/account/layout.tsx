"use client";
import AccountManagementLg from "@/src/components/Customer/AccountManagementLg";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import { useCustomerStore } from "@/src/state/customer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { customer, setCustomer } = useCustomerStore();
  const router = useRouter();

  // useEffect(() => {
  //   setCustomer();
  // }, []);

  if (!customer) {
    router.push("/customer/login");
    return;
  }

  return (
    <div>
      <Header />

      <div className="mb-2">
        <div className="my-16">
          <div className="flex mb-4 justify-center w-full ">
            <Breadcrumb
              items={[
                { route: "/", text: "Home" },
                { route: "/account", text: "My Account" },
              ]}
            />
          </div>

          <h1 className="text-[40px] text-center font-normal">My Account</h1>
        </div>

        <hr className="text-[#E8D4C1]" />
      </div>

      <div className="grid grid-cols-[350px_auto]  layout">
        <div className="border-r-2 pt-6 border-[#E8D4C1]">
          <AccountManagementLg />
        </div>

        <div>{children}</div>
      </div>

      <RecentlyViewed />

      <Footer />
    </div>
  );
}
