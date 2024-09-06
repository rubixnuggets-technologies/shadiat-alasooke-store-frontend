"use client";
import User from "../../assets/svg/user.svg";
import Cart from "../../assets/svg/cart.svg";
import Search from "../../assets/svg/search.svg";
import Award from "../../assets/svg/award.svg";
import PathFlow from "../../assets/svg/path-flow.svg";
import QualityCraft from "../../assets/svg/quality-craft.svg";
import UserNoUnderline from "../../assets/svg/user-no-underline.svg";
import Heart from "../../assets/svg/heart.svg";

export type IconProps = {
  className?: string;
  type: "user" | "cart" | "search" | "award" | "pathFlow" | "qualityCraft" | "userNoUnderline" | "heart";
};

const components: Record<IconProps["type"], string> = {
  user: User,
  cart: Cart,
  search: Search,
  pathFlow: PathFlow,
  qualityCraft: QualityCraft,
  award: Award,
  heart: Heart,
  userNoUnderline: UserNoUnderline,
};

export default function Icon({ className = "inline-block", type }: IconProps) {
  let mobileType = type + "Small";
  let Component = components[type];

  return <Component className={className} />;
}
