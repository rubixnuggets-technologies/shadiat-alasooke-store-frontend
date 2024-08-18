"use client";
import User from "../../assets/svg/user.svg";
import Cart from "../../assets/svg/cart.svg";
import Search from "../../assets/svg/search.svg";

export type IconProps = {
  className?: string;
  type: "user" | "cart" | "search";
};

const components: Record<IconProps["type"], string> = {
  user: User,
  cart: Cart,
  search: Search,
};

export default function Icon({ className = "inline-block", type }: IconProps) {
  let mobileType = type + "Small";
  let Component = components[type];

  return <Component className={className} />;
}
