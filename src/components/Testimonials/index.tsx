import RichTextComponent from "../RichTextComponent";
import Button from "../ui/button";

const Testimonials = ({ testimonials }) => {
  return (
    <div>
      <div>
        <h1 className="text-[20px] text-brown-2100 text-left text-center lg:text-[40px]">Testimonials</h1>
      </div>

      <div className="my-7 lg:my-12">
        <ul className="flex flex-col gap-3 lg:grid lg:flex-col gap-x-8">
          {testimonials.map((item, idx) => (
            <li key={idx}>
              <div className="border-[1px] mx-8 border-black p-9 lg:p-14">
                <p className="mb-2 text-sm lg:text-xl font-bold">{item.title}</p>
                <RichTextComponent textClassname="text-sm lg:text-base" richText={item.body} />

                <p className="mt-6 text-base">— {`${item.fullname}, ${item.location}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <Button title="More Review" />
      </div>
    </div>
  );
};

export default Testimonials;
