"use client";
import { useCustomerStore } from "@/src/state/customer";
import Icon from "../ui/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames"

const ROUTES = [
  {
    icon: "user",
    text: "My Account",
    route: "/account",
  },
  {
    icon: "orders",
    text: "My Order History",
    route: "/account/order-history",
  },
  {
    icon: "heart",
    text: "Saved Items",
    route: "/account/saved-items",
  },
  {
    icon: "logout",
    text: "Log Out",
  },
];

export default function AccountManagementLg() {
  const { logoutCustomer } = useCustomerStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutCustomer();

    router.push("/");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[32px] text-brown-dark-2100 ">
          Account Management
        </h1>
      </div>

      <ul className="flex flex-col gap-8">
        {ROUTES.map(({ icon, text, route }) => (
          <li>
            {route ? (
              <Link href={route}>
                <div className="flex flex-row">
                  <div className="mr-3 flex items-center">
                    <Icon type={icon} />
                  </div>

                  <div className="flex items-center">
                    <p className={cn("text-base hover:text-brown-dark-2100", route === pathname ? "text-brown-dark-2100 font-semibold" : "text-[#55677B]")}> {text} </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div>
                <hr className="text-[#E8D4C1] mb-8" />

                <li>
                  <div
                    onClick={handleLogout}
                    className="flex flex-row hover:cursor-pointer"
                  >
                    <div className="mr-3 flex items-center">
                      <Icon type="logout" />
                    </div>

                    <div className="flex">
                      <p className="text-base text-coral-700"> Log Out </p>
                    </div>
                  </div>
                </li>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
