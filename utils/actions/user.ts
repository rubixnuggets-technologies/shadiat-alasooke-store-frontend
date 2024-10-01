"use server";
import { cookies } from "next/headers";
import { Customer } from "@medusajs/medusa";

const SHADIAT_FASHION_APP_USER = "shadiat-fashion-app-user";

export const storeUserData = async ({ user }: { user: Customer }) => {
  try {
    const cookieStore = cookies();

    await cookieStore.set(SHADIAT_FASHION_APP_USER, JSON.stringify(user), {
      secure: true,
    });
  } catch (error) {
    console.error("Error storing user data", error);
  }
};

export const getUserData = async () => {
  try {
    const cookieStore = cookies();
    const user = cookieStore.get(SHADIAT_FASHION_APP_USER);

    if (!user) {
      return null;
    }

    const parsedUser = JSON.parse(user.value);

    return parsedUser;
  } catch (error) {
    console.error("Error getting user data", error);
  }
};

export const removeUserData = async () => {
  try {
    cookies().delete(SHADIAT_FASHION_APP_USER);
  } catch (error) {
    console.log(error);
  }
};
