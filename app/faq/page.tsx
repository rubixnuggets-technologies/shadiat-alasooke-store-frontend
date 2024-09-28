import { SanityClient } from "@/utils/Sanity/client";
import { FAQ_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound } from "next/navigation";
import FAQCard from "@/src/components/ui/cards/FAQCard";

const getPageData = async (slug: string) => {
  const data = await SanityClient().fetch(FAQ_PAGE_QUERY);

  return { data };
};

export default async function Page({ params }) {
  const { data } = await getPageData(params?.slug);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-center mb-6 text-2xl">
          Frequently Asked Questions
        </h1>
        <p className="text-center mb-4"> Last updated on 16th July 2024 </p>
        <hr className="text-[#A2B1C3]" />
      </div>

      <div className="layout">
        <ul className="grid gap-6">
          {data.map((item, index) => (
            <li key={item?._id}>
              <FAQCard faq={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
