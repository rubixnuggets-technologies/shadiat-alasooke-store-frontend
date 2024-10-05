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
  override_classname,
  color,
  icon,

  width,
  textClassname,
  height,
  type,
}: Props) => {
  return (
    <button
      type={type}
      onClick={clickAction}
      disabled={disabled}
      className={classNames(
        textClassname ? `text-xs lg:text-base font-semibold` : textClassname,
        `bg-transparent hover:bg-[#857B74] flex flex-row hover:cursor-pointer items-center justify-center text-[#857B74] hover:text-white border-[1px] border-[#857B74] hover:border-[#857B74] h-9 lg:h-[48px] px-8 border-1 w-${width}`
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
