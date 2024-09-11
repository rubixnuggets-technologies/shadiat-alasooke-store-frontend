import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import RichTextComponent from "@/src/components/RichTextComponent";
import { SanityClient } from "@/utils/Sanity/client";
import { EXPLORE_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound } from "next/navigation";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import ProductNavigation from "@/src/components/ExploreProducts/ProductNavigation";

const getPageData = async (slug: string) => {
  const data = await SanityClient().fetch(EXPLORE_PAGE_QUERY(slug));

  return { data: data[0] };
};

export default async function ExplorePage({ params }) {
  const { slug } = params;
  const { data } = await getPageData(slug);

  if (!data) notFound();

  const { by_color_filters, by_product_filters, by_new_arrivals_filters } = data;

  return (
    <div>
      <Header />

      <div>
        <div className="flex flex-col items-center mb-36 ">
          <p className="text-4xl mb-6"> {data?.title} </p>

          <div className="max-w-[396px] text-sm m-auto text-center">
            <RichTextComponent richText={data?.description} />
          </div>
        </div>

         <ProductNavigation />

        <hr className="text-brown-1200 mt-8" />

        <ProductsHighlight
          filters={{
            by_color_filters,
            by_product_filters,
            by_new_arrivals_filters,
          }}
          collectionKey={data?.collection_key}
        />
      </div>

      <Footer />
    </div>
  );
}

export const generateStaticParams = async () => {
  const data = await SanityClient().fetch(EXPLORE_PAGE_QUERY());

  return data.map((page: any) => ({
    slug: page.slug || "",
  }));
};
