import Link from "next/link";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";

import RichTextComponent from "../RichTextComponent";
import Button from "../ui/button";

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

const Testimonials = ({ testimonials }) => {
  return (
    <div className="layout">
      <div>
        <h1 className="text-[20px] text-brown-2100 text-left text-center lg:text-[40px]">
          Testimonials
        </h1>
      </div>

      <div className="my-7 lg:my-12">
        <ul className="flex no-scrollbar flex-col gap-4 lg:gap-2 lg:flex-row overflow-scroll w-full">
          {testimonials.map((item, idx) => (
            <li key={idx}>
              <div className="border-[0.5px] lg:border-[1px] w-full lg:w-[503px] h-56 lg:h-80 mx-8 border-black p-7 lg:p-14">
                <p className="mb-2 text-sm lg:text-xl font-bold">
                  {item.title}
                </p>

                <div className="mb-3">
                  <StarRating rating={item?.rating_count} />
                </div>

                <RichTextComponent
                  textClassname="text-xs lg:text-base line-clamp-5"
                  richText={item.body}
                />

                <p className="mt-6 text-xs lg:text-base">
                  — {`${item.fullname}, ${item.location}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <Link href="/testimonials">
          <Button title="More Review" />
        </Link>
      </div>
    </div>
  );
};

export default Testimonials;
