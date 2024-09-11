import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  title: string;
  clickAction?: () => void;
  disabled?: boolean;
  color?: string;
  override_classname?: string;
  icon?: ReactNode;
}

const Button = ({
  title,
  clickAction,
  disabled = false,
  override_classname,
  color,
  icon,
}: Props) => {
  return (
    <button
      onClick={clickAction}
      disabled={disabled}
      className={classNames(
        override_classname
          ? override_classname
          : "flex flex-row items-center justify-center text-brown-2100 border-2 border-brown-2100 h-[48px] px-12 border-brown-100 border-1"
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
