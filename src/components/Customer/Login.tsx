"use client";

import { useState } from "react";
import Link from "next/link";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { useRouter } from "next/navigation";
import { storeUserData } from "@/utils/actions/user";
import Header from "../Header";
import { SubmitHandler, useForm } from "react-hook-form";
import Icon from "../ui/icons";
import Button from "../ui/button";

interface AuthData {
  email: "";
  password: "";
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    email: "";
    password: "";
  }>();

  const [authStatus, setAuthStatus] = useState({
    status: "",
    message: "",
  });

  const router = useRouter();

  const submitAuthInfo: SubmitHandler<AuthData> = async (data) => {
    try {
      const user = await MedusaClient.auth.authenticate({
        email: data.email,
        password: data.password,
      });

      await MedusaClient.auth.getToken({
        email: data.email,
        password: data.password,
      });

      await storeUserData({ user: user?.customer });

      router.refresh();
      router.push("/");
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

  const [email, password] = watch(["email", "password"]);

  return (
    <div>
      <Header />

      <div className="layout">
        <div className="h-full w-full justify-center">
          <div className="max-w-[950px] m-auto mt-10 lg:mt-36">
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
                    <div className="bg-coral-700 h-12 my-4 flex items-center justify-center">
                      <p className="text-white">{authStatus.message}</p>
                    </div>
                  )}

                  <div id="auth-form-fields" className="w-full">
                    <form
                      onSubmit={handleSubmit(submitAuthInfo)}
                      method="POST"
                      className="w-full"
                    >
                      <div className="form-group flex flex-col mt-6">
                        <input
                          type="email"
                          className="auth__input rounded-0 text-sm focus:outline-none"
                          defaultValue={""}
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          placeholder="EMAIL ADDRESS*"
                        />

                        {errors.email && (
                          <p className="mt-1 text-coral-700 text-xs">
                            *Required Field
                          </p>
                        )}
                      </div>

                      <div className="form-group flex flex-col mt-8">
                        <input
                          type="password"
                          className="auth__input text-sm focus:outline-none"
                          defaultValue={""}
                          {...register("password", {
                            required: true,
                          })}
                          placeholder="PASSWORD*"
                        />

                        {errors.password && (
                          <p className="mt-1 text-coral-700 text-xs">
                            *Required Field
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-brown-dark-1500">
                          Forgot Password?
                          <span className="underline ml-1 hover:cursor-pointer text-brown-dark-2100">
                            Reset it
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col mt-8">
                        <Button
                          disabled={!email && !password}
                          type="submit"
                          title="Log In"
                        />

                        <div className="mt-4">
                          <p className="text-sm text-brown-dark-1500">
                            Don't have an Account?
                            <Link href={"/customer/create-account"}>
                              <span
                                id="show-create-account"
                                className="underline hover:cursor-pointer ml-1 text-brown-dark-2100"
                              >
                                Create an Account
                              </span>
                            </Link>
                          </p>
                        </div>

                        {/* <button
                          type="button"
                          id="btn-google"
                          className="btn flex flex-row items-center justify-center btn-default hover:cursor-pointer auth__button mt-6"
                        >
                          <div className="mr-4">
                            <Icon type="google" />
                          </div>
                          Log In with Google
                        </button> */}
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
