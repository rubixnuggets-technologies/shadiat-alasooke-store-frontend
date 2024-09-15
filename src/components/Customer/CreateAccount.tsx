"use client";

import { useCreateCustomer } from "medusa-react";
import Link from "next/link";
import { useState } from "react";

type UserDetailsEnum = "name" | "password" | "confirmPassword" | "email";

export default function CreateAccount() {
  const [userDetails, setUserDetails] = useState<
    Record<UserDetailsEnum, string>
  >({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createCustomer = useCreateCustomer();

  const handleChange = (key: UserDetailsEnum, value: string) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      createCustomer.mutate(
        {
          first_name: userDetails.name,
          last_name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
        },
        {
          onSuccess: () => {
            console.log("Customer created successfully");
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="max-w-[950px] m-auto mt-36">
        <div
          id="login-auth-container"
          className="grid grid-cols-[50%_50%] gap-8"
        >
          <div className="w-full flex justify-start">
            <div className="w-full">
              <div className="login-header">
                <h1 id="auth__title" className="text-[40px] text-brown-2100">
                  Create your account
                </h1>
              </div>

              <div id="auth-form-fields" className="w-full">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  method="post"
                  className="w-full"
                >
                  <div className="form-group flex flex-col mt-6">
                    <input
                      type="text"
                      className="form-control auth__input"
                      id="name"
                      placeholder="FULL NAME*"
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="form-group flex flex-col mt-6">
                    <input
                      type="email"
                      className="form-control auth__input"
                      id="email"
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="EMAIL ADDRESS*"
                    />
                  </div>

                  <div className="form-group flex flex-col mt-8">
                    <input
                      type="password"
                      className="form-control auth__input"
                      id="confirm-password"
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="CONFIRM PASSWORD*"
                    />
                  </div>

                  <div className="form-group flex flex-col mt-8">
                    <input
                      type="password"
                      className="form-control auth__input"
                      id="password"
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="PASSWORD*"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-[12px] text-[#574F4B]">
                      I have read and agree to the
                      <span className="underline ml-1 mr-1 hover:cursor-pointer text-[#0C0B0A]">
                        Terms of use
                      </span>
                      and
                      <span className="underline ml-1 hover:cursor-pointer text-[#0C0B0A]">
                        Privacy Policy
                      </span>
                    </p>
                  </div>

                  <div className="captcha-container form-group"></div>

                  <div className="flex flex-col mt-8">
                    <button
                      onClick={handleSubmit}
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
                      className="btn btn-default hover:cursor-pointer auth__button mt-6"
                    >
                      Sign up with Google
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="max-w-[488px] m-auto">
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
  );
}
