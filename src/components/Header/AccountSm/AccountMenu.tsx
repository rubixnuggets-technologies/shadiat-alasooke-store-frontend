"use client";
import { useCallback, useState } from "react";
import Icon from "../../ui/icons";
import MobileAccountMenu from "./MobileAccountMenu";

const AccountMenu = () => {
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
      <div onClick={() => toggleMenu()} className="hover:cursor-pointer">
        <Icon type="user" />
      </div>

      <MobileAccountMenu closeMenu={() => toggleMenu()} state={menuState} />
    </div>
  );
};

export default AccountMenu;
