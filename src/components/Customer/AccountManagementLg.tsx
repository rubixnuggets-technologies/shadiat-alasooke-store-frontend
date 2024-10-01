"use client";
import { useCustomerStore } from "@/src/state/customer";
import Icon from "../ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountManagementLg() {
  const { logoutCustomer } = useCustomerStore();
  const router = useRouter()


  const handleLogout = async () => {
    await logoutCustomer();

    router.push("/")
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[32px] ">Account Management</h1>
      </div>

      <ul className="flex flex-col gap-8">
        <li>
          <Link href="/account/">
            <div className="flex flex-row">
              <div className="mr-3 flex items-center">
                <Icon type="user" />
              </div>

              <div className="flex items-center">
                <p className="text-base"> My Account </p>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/account/order-history">
            <div className="flex flex-row">
              <div className="mr-3 flex items-center">
                <Icon type="orders" />
              </div>

              <div className="flex items-center">
                <p className="text-base"> My Order History </p>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/account/saved-items">
            <div className="flex flex-row">
              <div className="mr-3  flex items-center">
                <Icon type="heart" />
              </div>

              <div className="flex items-center">
                <p className="text-base"> Saved Items </p>
              </div>
            </div>
          </Link>
        </li>

        <hr className="text-[#E8D4C1]" />

        <li>
          <div onClick={handleLogout} className="flex flex-row hover:cursor-pointer">
            <div className="mr-3 flex items-center">
              <Icon type="logout" />
            </div>

            <div className="flex">
              <p className="text-base text-coral-700"> Log Out </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
