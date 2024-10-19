"use client";
import { useCreateCustomer } from "medusa-react";
import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Checkbox from "../ui/Checkbox";
import Header from "../Header";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import Button from "../ui/button";
import { tempReorderRank } from "@medusajs/medusa/dist/types/product-category";
import classNames from "classnames";
import { useCustomerStore } from "@/src/state/customer";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface UserDetails {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const [termsAndConditions, acceptTermsAndConditions] = useState({
    accepted: false,
    validationError: false,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDetails>();

  const createCustomer = useCreateCustomer();

  const {} = useCustomerStore();

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

  const [confirmPassword, setConfirmedPassword] = useState("");
  const [password] = watch(["password"]);

  const submitUserDetails: SubmitHandler<UserDetails> = async (data) => {
    if (!termsAndConditions.accepted) {
      acceptTermsAndConditions({
        validationError: true,
        accepted: false,
      });

      return;
    }

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

            router.refresh();
            router.push("/");
          },
          onError: ({ message, cause }) => {
            // TODO: error cause value is not defined & not returning type
            if (message === "Request failed with status code 422") {
              handleCreateAccountError(
                "An account with this email already exists. Please log in or reset your password."
              );

              return;
            }

            handleCreateAccountError(
              "An error occurred while creating your account"
            );
          },
        }
      );
    } catch (error) {
      handleCreateAccountError("An error occurred while creating account");
    }
  };

  const [isPasswordVisible, setPasswordVisiblity] = useState(false);

  const togglePasswordVisibility = () =>
    setPasswordVisiblity(!isPasswordVisible);

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
                      className="text-[20px] lg:text-[40px] text-brown-light-2100"
                    >
                      Create your account
                    </h1>
                  </div>

                  {authStatus.status === "ERROR" && (
                    <div className="bg-coral-700 h-14 my-4 flex items-center justify-center">
                      <p className="text-white text-center">
                        {authStatus.message}
                      </p>
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
                        <div className="flex relative flex-row">
                          <input
                            type={!isPasswordVisible ? "password" : "text"}
                            defaultValue={""}
                            className="form-control w-full focus:outline-none text-xs lg:text-base auth__input"
                            {...register("password", {
                              required: true,
                            })}
                            placeholder="PASSWORD*"
                          />

                          <div
                            onClick={togglePasswordVisibility}
                            className="flex items-center absolute right-0 h-full hover:cursor-pointer"
                          >
                            {isPasswordVisible ? (
                              <IoEye size={22} />
                            ) : (
                              <IoEyeOff size={22} />
                            )}
                          </div>
                        </div>

                        {errors.password && (
                          <p className="mt-1 text-coral-700 text-xs">
                            *Required Field
                          </p>
                        )}
                      </div>

                      <div className="form-group flex flex-col mt-8">
                        <div className="flex relative flex-row">
                          <input
                            type={!isPasswordVisible ? "password" : "text"}
                            className="form-control w-full focus:outline-none text-xs lg:text-base auth__input"
                            defaultValue={""}
                            placeholder="CONFIRM PASSWORD*"
                            onChange={(e) =>
                              setConfirmedPassword(e.target.value)
                            }
                          />

                          <div
                            onClick={togglePasswordVisibility}
                            className="flex items-center absolute right-0 h-full hover:cursor-pointer"
                          >
                            {isPasswordVisible ? (
                              <IoEye size={22} />
                            ) : (
                              <IoEyeOff size={22} />
                            )}
                          </div>
                        </div>

                        {confirmPassword && confirmPassword !== password && (
                          <p className="mt-1 text-coral-700 text-xs">
                            Passwords do not match
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex flex-row gap-2 mb-8">
                        <Checkbox
                          borderColor={
                            termsAndConditions.validationError
                              ? "border-coral-700"
                              : "border-brown-light-1500"
                          }
                          selectCheckbox={() =>
                            acceptTermsAndConditions({
                              validationError: false,
                              accepted: !termsAndConditions.accepted,
                            })
                          }
                          isActive={termsAndConditions.accepted}
                        />

                        <p
                          className={classNames(
                            "text-sm",
                            termsAndConditions.validationError
                              ? "text-coral-700"
                              : "text-brown-dark-1500"
                          )}
                        >
                          I have read and agree to the
                          <Link href={"/about/terms-and-conditions"}>
                            <span className="underline ml-1 mr-1 hover:cursor-pointer text-[#3EB489]">
                              Terms of use
                            </span>
                          </Link>
                          and
                          <Link href={"/about/privacy-policy"}>
                            <span className="underline ml-1 hover:cursor-pointer text-[#3EB489]">
                              Privacy Policy
                            </span>
                          </Link>
                        </p>
                      </div>

                      <div className="flex flex-col mt-8">
                        <Button
                          disabled={confirmPassword !== password}
                          title="Create Account"
                          clickAction={handleSubmit(submitUserDetails)}
                        />

                        <div className="mt-4">
                          <p className="text-sm text-brown-dark-1500">
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

                        {/* <button
                          type="button"
                          id="btn-google"
                          className="btn flex flex-row items-center justify-center  btn-default hover:cursor-pointer auth__button mt-6"
                        >
                          <div className="mr-3">
                            <Icon type="google" />
                          </div>
                          Sign up with Google
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
