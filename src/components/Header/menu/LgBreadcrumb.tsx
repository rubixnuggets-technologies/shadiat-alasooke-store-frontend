import React from "react";
import Button from "../../ui/button";
import Icon from "../../ui/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const LgBreadcrumb = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="bg-brown-100 px-8 py-8 rounded-xl w-60">
      <ul className="flex flex-col gap-6">
        <li>
          <div className="flex flex-row">
            <div className="mr-4">
              <Icon type="userNoUnderline" />
            </div>

            <p> My Account </p>
          </div>
        </li>

        <li>
          <div className="flex flex-row">
            <div className="mr-4">
              <Icon type="userNoUnderline" />
            </div>

            <p> My Order History </p>
          </div>
        </li>

        <li>
          <div className="flex flex-row">
            <div className="mr-4">
              <Icon type="heart" />
            </div>

            <p> Saved Items </p>
          </div>
        </li>

        <li>
          <div>
            <Link href={"/customer/login"}>
              <Button width="full" title="Log in" />
            </Link>

            <div className="mt-4">
              <div
                className="hover:cursor-pointer"
                onClick={() => router.push("/customer/create-account")}
              >
                <p className="text-center"> Create Account </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LgBreadcrumb;
