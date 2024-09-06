interface Props {
  title: string;
  clickAction?: () => void;
  disabled?: boolean;
  color?: string;
}

const Button = ({ title, clickAction, disabled, color }: Props) => {
  return (
    <button
      onClick={clickAction}
      className="text-brown-2100 border-2 border-brown-2100 h-[50px] w-[205px] border-brown-100 border-1"
    >
      {title}
    </button>
  );
};

export default Button;
