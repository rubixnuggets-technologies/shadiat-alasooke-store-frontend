import RichTextComponent from "@/src/components/RichTextComponent";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
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
      <div className="mb-9">
        <div className="flex justify-center mb-2">
          <Breadcrumb
            items={[
              { route: "/", text: "Home" },
              { route: "/explore/shop-aso-oke", text: "Shop Aso Oke" },
            ]}
          />
        </div>

        <h1 className="text-center mb-6 text-xl lg:text-[40px]">
          {data?.title}
        </h1>
        <p className="text-center mb-14"> Last updated on 16th July 2024 </p>
        <hr className="text-[#A2B1C3]" />
      </div>

      <div className="layout">
        <RichTextComponent richText={data?.body} />
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const data = await SanityClient().fetch(ABOUT_PAGE_QUERY());

  return data.map((page: any) => ({
    slug: page.slug,
  }));
};
