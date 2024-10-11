"use client";
import { useCallback, useState } from "react";
import BreadcrumbLogo from "../../../assets/custom-icons/breadcrumb.svg";
import MobileHeaderMenu from "./MobileHeaderMenu";

const Breadcrumb = () => {
  const [menuState, setMenuState] = useState("closed");

  /**
   * Toggle menu open or closed
   */
  const toggleMenu = useCallback(
    (toState: string = null) => {
      if (toState == null) {
        toState = menuState == "open" ? "closed" : "open";
      }
      setMenuState(toState);
    },
    [menuState]
  );

  return (
    <div className="">
      <div onClick={() => toggleMenu()} className="flex items-center hover:cursor-pointer">
        <BreadcrumbLogo />
      </div>

      <MobileHeaderMenu closeMenu={() => toggleMenu()} state={menuState} />
    </div>
  );
};

export default Breadcrumb;
