import cn from 'classnames'

interface DotsIndicatorProps {
    activeItem: number;
  data: any[];
  clickAction: (item: number) => void;
}

const DotsIndicator = ({
  activeItem,
  data,
  clickAction,
}: DotsIndicatorProps) => {
  if (!data) return;

  return (
    <div>
      <ul className="mt-14 flex flex-row justify-center gap-3">
        {data.map((_, idx) => (
          <li key={idx}>
            <div
              onClick={() => clickAction(idx)}
              className={cn(
                "h-[13px] rounded-full hover:cursor-pointer",
                activeItem === idx
                  ? "w-[43px] bg-brown-1900"
                  : "w-[14px] bg-brown-100"
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DotsIndicator;
