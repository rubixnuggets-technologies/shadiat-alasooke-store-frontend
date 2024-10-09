import TestimonialCard from "@/src/components/Testimonials/TestimonialCard";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import { SanityClient } from "@/utils/Sanity/client";
import { ALL_TESTIMONIALS_QUERY, HOME_PAGE_QUERY } from "@/utils/Sanity/gqols";

const getPage = async () => {
  const data = await SanityClient().fetch(ALL_TESTIMONIALS_QUERY);

  return {
    testimonials: data,
  };
};

export default async function Page() {
  const { testimonials } = await getPage();

  return (
    <div>
      <div className="mb-1 lg:mb-12">
        <div className="my-8 lg:my-16">
          <div className="flex mb-3 justify-center w-full ">
            <Breadcrumb
              items={[
                { route: "/", text: "Home" },
                { route: "/testimonial", text: "Testimonial" },
              ]}
            />
          </div>

          <h1 className="text-[30px] lg:text-[40px] text-center font-normal">Testimonials</h1>
        </div>

        <hr className="text-[#E8D4C1] hidden lg:flex" />
      </div>

      <div className="flex justify-center mb-16">
        <ul className="flex flex-col gap-4 lg:gap-2">
          {testimonials.map((item, idx) => (
            <li key={idx}>
              <TestimonialCard fullContent testimonial={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
