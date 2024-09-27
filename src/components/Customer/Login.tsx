"use client";

import { useState } from "react";
import Link from "next/link";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { useRouter } from "next/navigation";
import { storeUserData } from "@/utils/actions/user";
import Header from "../Header";
import Icon from "../ui/icons";

export default function Login() {
  const [userDetails, setUserDetails] = useState<
    Record<"email" | "password", string>
  >({
    email: "",
    password: "",
  });
  const [authStatus, setAuthStatus] = useState({
    status: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (key: "email" | "password", value: string) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const user = await MedusaClient.auth.authenticate({
        email: userDetails.email,
        password: userDetails.password,
      });

      await storeUserData({ user: user?.customer });
      router.push("/cart");
    } catch (error) {
      setAuthStatus({
        status: "ERROR",
        message: "Username / Password is incorrect",
      });

      setTimeout(() => {
        setAuthStatus({
          status: "",
          message: "",
        });
      }, 3000);

      console.log("auth err:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="layout-container">
        <div className="h-full w-full">
          <div className="max-w-[950px] mt-10 lg:mt-36">
            <div
              id="login-auth-container"
              className="flex flex-col lg:grid lg:grid-cols-[50%_50%] gap-8"
            >
              <div className="w-full flex justify-start">
                <div className="w-full">
                  <div className="login-header">
                    <h1
                      id="auth__title"
                      className="text-[20px] lg:text-[40px] text-brown-2100"
                    >
                      Log into your account
                    </h1>
                  </div>

                  {authStatus.status === "ERROR" && (
                    <div className="bg-[red] h-12 my-4 flex items-center justify-center">
                      <p className="text-white">{authStatus.message}</p>
                    </div>
                  )}

                  <div id="auth-form-fields" className="w-full">
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      method="POST"
                      className="w-full"
                    >
                      <div className="form-group flex flex-col mt-6">
                        <input
                          type="email"
                          className="form-control auth__input focus:outline-none"
                          id="email"
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="EMAIL ADDRESS*"
                        />
                      </div>

                      <div className="form-group flex flex-col mt-8">
                        <input
                          type="password"
                          className="form-control auth__input focus:outline-none"
                          id="password"
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          placeholder="PASSWORD*"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-[12px] text-[#574F4B]">
                          Forgot Password?
                          <span className="underline ml-1 hover:cursor-pointer text-[#0C0B0A]">
                            Reset it
                          </span>
                        </p>
                      </div>

                      <div className="captcha-container form-group"></div>

                      <div className="flex flex-col mt-8">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          id="btn-login"
                          className="auth__button"
                        >
                          Log In
                        </button>

                        <div className="mt-4">
                          <p className="text-[12px] text-[#574F4B]">
                            Don't have an Account?
                            <Link href={"/customer/create-account"}>
                              <span
                                id="show-create-account"
                                className="underline hover:cursor-pointer ml-1 text-[#0C0B0A]"
                              >
                                Create an Account
                              </span>
                            </Link>
                          </p>
                        </div>

                        <button
                          type="button"
                          id="btn-google"
                          className="btn flex flex-row items-center justify-center btn-default hover:cursor-pointer auth__button mt-6"
                        >
                          <div className="mr-4">
                            <Icon type="google" />
                          </div>
                          Log In with Google
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex max-w-[488px] m-auto">
                <div id="auth-cover-image">
                  <img
                    alt="Shadiat Alasooke"
                    className="cover__image"
                    src="https://res.cloudinary.com/demw3uawq/image/upload/v1726143739/alasooke-project/auth0-auth-assets/ip8gphzkq6fuyp5t5cem.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}