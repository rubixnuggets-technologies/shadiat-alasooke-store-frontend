"use client";
import AccountManagementLg from "@/src/components/Customer/AccountManagementLg";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import PagesHeroSection from "@/src/components/ui/PagesHeroSection";
import { useCustomerStore } from "@/src/state/customer";
import { usePathname, useRouter } from "next/navigation";

const pathnames = {
  "/account": "My Account",
  "/account/order-history": "My Order History",
  "/account/saved-items": "Saved Items",
};

export default function Layout({ children }) {
  const { customer } = useCustomerStore();
  const router = useRouter();
  const pathName = usePathname();

  if (!customer) {
    router.push("/customer/login");
    return;
  }

  return (
    <div>
      <Header />

      <PagesHeroSection
        title={pathnames[pathName || ""]}
        breadcrumbItems={[
          { route: "/", text: "Home" },
          { route: pathName, text: pathnames[pathName || ""] },
        ]}
      />

      <div className="flex flex-col lg:grid lg:grid-cols-[350px_auto]  layout">
        <div className="hidden lg:flex border-r-2 pt-6 border-[#E8D4C1]">
          <AccountManagementLg />
        </div>

        <div>{children}</div>
      </div>

      <RecentlyViewed />

      <Footer />
    </div>
  );
}
