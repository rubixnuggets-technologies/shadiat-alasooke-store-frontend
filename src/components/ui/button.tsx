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
  // override_classname,
  // color,
  icon,

  width,
  textClassname,
  // height,
  type,
}: Props) => {
  return (
    <button
      type={type}
      onClick={clickAction}
      disabled={disabled}
      className={classNames(
        "transition ease-in-out delay-150",
        `bg-transparent flex flex-row items-center justify-center text-[#857B74] border-[1px] border-[#857B74] hover:border-[#857B74] h-9 lg:h-[48px] px-8 border-1 w-${width}`,
        textClassname ? textClassname : `text-xs lg:text-base font-semibold`,
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
