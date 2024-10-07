import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import cn from "classnames";

import RichTextComponent from "../RichTextComponent";

const StarRating = ({ rating }: { rating: number }) => (
  <ul className="flex flex-row">
    {new Array(rating).fill("").map((_, idx) => (
      <li key={idx}>
        <IoStarSharp className="text-xs lg:text-2xl" color="#D0AF00" />
      </li>
    ))}

    {new Array(5 - rating).fill("").map((_, idx) => (
      <li key={idx}>
        <IoStarOutline className="text-xs lg:text-2xl" />
      </li>
    ))}
  </ul>
);

const TestimonialCard = ({ testimonial, fullContent }) => {
  return (
    <div className={cn("border-[0.5px] lg:border-[1px] w-full lg:w-[503px] mx-8 border-black p-7 lg:p-14", fullContent ? "h-auto w-[85%] lg:w-[503px]" : "h-56 lg:h-80 ")}>
      <p className="mb-2 text-sm lg:text-xl font-bold">{testimonial.title}</p>

      <div className="mb-3">
        <StarRating rating={testimonial?.rating_count} />
      </div>

      <RichTextComponent
        textClassname={cn(
          `text-xs lg:text-base`,
          fullContent ? "line-clamp-none" : "line-clamp-5"
        )}
        richText={testimonial.body}
      />

      <p className="mt-6 text-xs lg:text-base">
        — {`${testimonial.fullname}, ${testimonial.location}`}
      </p>
    </div>
  );
};

export default TestimonialCard;
