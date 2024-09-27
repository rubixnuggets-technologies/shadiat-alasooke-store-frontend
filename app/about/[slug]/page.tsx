import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import RichTextComponent from "@/src/components/RichTextComponent";
import { SanityClient } from "@/utils/Sanity/client";
import { ABOUT_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound } from "next/navigation";

const getPageData = async (slug: string) => {
  const data = await SanityClient().fetch(ABOUT_PAGE_QUERY(slug));

  return { data: data[0] };
};

export default async function Page({ params }) {
  const { data } = await getPageData(params?.slug);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <Header />

      <div>
        <div className="mb-4">
          <h1 className="text-center mb-6 text-2xl">{data?.title}</h1>
          <p className="text-center mb-4"> Last updated on 16th July 2024 </p>
          <hr className="text-[#A2B1C3]" />
        </div>

        <div className="layout">
          <div className="layout-container">
            <RichTextComponent richText={data?.body} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const generateStaticParams = async () => {
  const data = await SanityClient().fetch(ABOUT_PAGE_QUERY());

  return data.map((page: any) => ({
    slug: page.slug,
  }));
};
