"use client";
import { useCreateCustomer } from "medusa-react";
import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Checkbox from "../ui/Checkbox";
import Icon from "../ui/icons";
import Header from "../Header";
import MedusaClient from "@/utils/Medusa/MedusaClient";

interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const [isTOCAccepted, acceptTOC] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDetails>();

  const createCustomer = useCreateCustomer();

  const [authStatus, setAuthStatus] = useState({
    status: "",
    message: "",
  });

  const handleCreateAccountError = (message: string) => {
    setAuthStatus({
      status: "ERROR",
      message,
    });

    setTimeout(() => {
      setAuthStatus({
        status: "",
        message: "",
      });
    }, 3000);
  };

  const submitUserDetails: SubmitHandler<UserDetails> = async (data) => {
    try {
      const nameSplit = data?.name?.split(" ");

      createCustomer.mutate(
        {
          first_name: nameSplit[0],
          last_name: nameSplit[1] || "",
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: async () => {
            await MedusaClient.auth.getToken({
              email: data.email,
              password: data.password,
            });

            router.refresh()
            router.push("/");
          },
          onError: (error) => {
            handleCreateAccountError(
              "An error occurred while creating account"
            );
          },
        }
      );
    } catch (error) {
      handleCreateAccountError("An error occurred while creating account");
    }
  };

  const [name, email, password, confirmPassword] = watch([
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);

  return (
    <div>
      <Header />

      <div className="layout">
        <div className="h-full w-full">
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
                      Create your account
                    </h1>
                  </div>

                  {authStatus.status === "ERROR" && (
                    <div className="bg-coral-700 h-12 my-4 flex items-center justify-center">
                      <p className="text-white">{authStatus.message}</p>
                    </div>
                  )}

                  <div id="auth-form-fields" className="w-full">
                    <form
                      onSubmit={handleSubmit(submitUserDetails)}
                      method="post"
                      className="w-full"
                    >
                      <div className="form-group flex flex-col mt-6">
                        <input
                          type="text"
                          className="form-control focus:outline-none text-xs lg:text-base auth__input"
                          defaultValue={""}
                          {...register("name", {
                            required: true,
                          })}
                          placeholder="FULL NAME*"
                        />

                        {errors.name && (
                          <p className="mt-1 text-coral-700 text-xs">
                            *Required Field
                          </p>
                        )}
                      </div>

                      <div className="form-group flex flex-col mt-6">
                        <input
                          type="email"
                          className="form-control focus:outline-none text-xs lg:text-base auth__input"
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
                          defaultValue={""}
                          className="form-control focus:outline-none text-xs lg:text-base auth__input"
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

                      <div className="form-group flex flex-col mt-8">
                        <input
                          type="password"
                          className="form-control focus:outline-none text-xs lg:text-base auth__input"
                          defaultValue={""}
                          {...register("confirmPassword", {
                            required: true,
                          })}
                          placeholder="CONFIRM PASSWORD*"
                        />

                        {errors.confirmPassword && (
                          <p className="mt-1 text-coral-700 text-xs">
                            *Required Field
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex flex-row gap-2">
                        <Checkbox
                          selectCheckbox={() => acceptTOC(!isTOCAccepted)}
                          isActive={isTOCAccepted}
                        />

                        <p className="text-[12px] text-[#574F4B]">
                          I have read and agree to the
                          <span className="underline ml-1 mr-1 hover:cursor-pointer text-[#3EB489]">
                            Terms of use
                          </span>
                          and
                          <span className="underline ml-1 hover:cursor-pointer text-[#3EB489]">
                            Privacy Policy
                          </span>
                        </p>
                      </div>

                      <div className="captcha-container form-group"></div>

                      <div className="flex flex-col mt-8">
                        <button
                          onClick={handleSubmit(submitUserDetails)}
                          type="submit"
                          id="btn-login"
                          className="auth__button"
                        >
                          Create Account
                        </button>

                        <div className="mt-4">
                          <p className="text-[12px] text-[#574F4B]">
                            Have an Account already?
                            <Link href={"/customer/login"}>
                              <span
                                id="show-create-account"
                                className="underline hover:cursor-pointer ml-1 text-[#0C0B0A]"
                              >
                                Login
                              </span>
                            </Link>
                          </p>
                        </div>

                        <button
                          type="button"
                          id="btn-google"
                          className="btn flex flex-row items-center justify-center  btn-default hover:cursor-pointer auth__button mt-6"
                        >
                          <div className="mr-3">
                            <Icon type="google" />
                          </div>
                          Sign up with Google
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
                    src="https://res.cloudinary.com/demw3uawq/image/upload/v1726152978/alasooke-project/auth0-auth-assets/k0rengvdg1a3driog5ic.png"
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
