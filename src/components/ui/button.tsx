import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  title: string;
  clickAction?: () => void;
  disabled?: boolean;
  color?: string;
  override_classname?: string;
  icon?: ReactNode;

  width?: string;
  height?: string;
}

const Button = ({
  title,
  clickAction,
  disabled = false,
  override_classname,
  color,
  icon,

  width,
  height,
}: Props) => {
  return (
    <button
      onClick={clickAction}
      disabled={disabled}
      className={classNames(
        `flex flex-row hover:cursor-pointer items-center justify-center text-brown-2100 border-[1px] border-brown-2100 h-9 lg:h-[48px] text-sm lg:text-base font-semibold px-12 border-brown-100 border-1 w-${width}`
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
