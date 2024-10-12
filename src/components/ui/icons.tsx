"use client";
import User from "../../assets/svg/user.svg";
import Cart from "../../assets/svg/cart.svg";
import Search from "../../assets/svg/search.svg";
import Award from "../../assets/svg/award.svg";
import PathFlow from "../../assets/svg/path-flow.svg";
import QualityCraft from "../../assets/svg/quality-craft.svg";
import UserNoUnderline from "../../assets/svg/user-no-underline.svg";
import Heart from "../../assets/svg/heart.svg";
import Orders from "../../assets/svg/orders.svg";
import Logout from "../../assets/svg/logout.svg";

import Google from "../../assets/custom-icons/google.svg";

import CustomizeDesign from "../../assets/custom-icons/customize-design.svg";
import Collections from "../../assets/custom-icons/rtw-collections.svg";
import CulturalHeritage from "../../assets/custom-icons/cultural-heritage.svg";
import QualityCraftmanship from "../../assets/custom-icons/quality-craftmanship.svg";

import Award1 from "../../assets/svg/award-1.svg";
import Award2 from "../../assets/svg/award-2.svg";
import Award3 from "../../assets/svg/award-3.svg";

export type IconProps = {
  className?: string;
  type:
    | "user"
    | "cart"
    | "search"
    | "award"
    | "pathFlow"
    | "qualityCraft"
    | "userNoUnderline"
    | "heart"
    | "orders"
    | "google"
    | "logout"
    | "cultural_heritage"
    | "rtw_collections"
    | "customize_design"
    | "quality_craftmanship"

    | "award1"
    | "award2"
    | "award3"
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
  orders: Orders,
  google: Google,
  logout: Logout,

  cultural_heritage: CulturalHeritage,
  rtw_collections: Collections,
  customize_design: CustomizeDesign,
  quality_craftmanship: QualityCraftmanship,

  award1: Award1,
  award2: Award2,
  award3: Award3,
};

export default function Icon({ className = "inline-block", type }: IconProps) {
  let mobileType = type + "Small";
  let Component = components[type];

  return <Component className={className} />;
}
