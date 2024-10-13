import { SanityClient } from "@/utils/Sanity/client";
import { FAQ_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound } from "next/navigation";
import FAQCard from "@/src/components/ui/cards/FAQCard";
import PagesHeroSection from "@/src/components/ui/PagesHeroSection";

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
      <div className="mb-4">
        <PagesHeroSection
          title="Frequently Asked Questions"
          breadcrumbItems={[
            { text: "Home", route: "/" },
            { text: "FAQ", route: "/faq" },
          ]}
        />
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
