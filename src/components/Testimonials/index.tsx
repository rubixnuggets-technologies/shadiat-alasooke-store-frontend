import Link from "next/link";
 
import Button from "../ui/button";
import TestimonialCard from "./TestimonialCard";

const Testimonials = ({ testimonials }) => {
  return (
    <div className="layout">
      <div>
        <h1 className="text-[20px] text-brown-2100 text-center lg:text-[40px]">
          Testimonials
        </h1>
      </div>

      <div className="my-7 lg:my-12">
        <ul className="flex no-scrollbar flex-col gap-4 lg:gap-6 lg:flex-row overflow-scroll w-full">
          {testimonials.map((item, idx) => (
            <li key={idx}>
              <TestimonialCard testimonial={item} />
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
