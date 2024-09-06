import RichTextComponent from "../RichTextComponent";
import Button from "../ui/button";

const Testimonials = ({ testimonials }) => {
  return (
    <div>
      <div>
        <h1 className="text-[40px] text-center">Testimonials</h1>
      </div>

      <div className="my-12">
        {/* {JSON.stringify(testimonials)} */}

        <ul className="grid grid-cols-10 gap-x-8">
          {testimonials.map((item, idx) => (
            <li key={idx}>
              <div className="border-2 border-black p-14">
                <p className="mb-2 text-xl font-bold">{item.title}</p>
                <RichTextComponent richText={item.body} />

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
