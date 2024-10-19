import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  title: string;
  clickAction?: () => void;
  disabled?: boolean;
  color?: string;
  override_classname?: string;
  icon?: ReactNode;
  type?: "submit" | "reset" | "button";

  width?: string;
  height?: string;
  textClassname?: string;
}

const Button = ({
  title,
  clickAction,
  disabled = false,
  color,
  icon,

  width,
  textClassname,
  type,
}: Props) => {
  return (
    <button
      type={type}
      onClick={clickAction}
      disabled={disabled}
      className={classNames(
        "transition ease-in-out delay-150",
        `bg-transparent flex flex-row items-center justify-center border-[1px]   h-9 lg:h-[48px] px-8 border-1 w-${width}`,
        textClassname ? textClassname : `text-xs lg:text-base font-semibold`,
        color
          ? `border-${color} hover:border-${color} text-${color}`
          : `border-brown-dark-2100 hover:border-[#857B74] text-brown-dark-2100`,
        disabled
          ? ""
          : "hover:bg-[#857B74] hover:cursor-pointer hover:text-white"
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
