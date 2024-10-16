import RichTextComponent from "@/src/components/RichTextComponent";
import { SanityClient } from "@/utils/Sanity/client";
import { EXPLORE_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound } from "next/navigation";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import ProductNavigation from "@/src/components/ExploreProducts/ProductNavigation";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import Breadcrumb from "@/src/components/ui/Breadcrumb";

const getPageData = async (slug: string) => {
  const data = await SanityClient().fetch(EXPLORE_PAGE_QUERY(slug));

  return { data: data[0] };
};

export default async function ExplorePage({ params }) {
  const { slug } = params;
  const { data } = await getPageData(slug);

  if (!data) notFound();

  const { by_color_filters, by_product_filters, by_new_arrivals_filters } =
    data;

  return (
    <div>
      <div className="flex flex-col items-center mb-14 lg:mb-28">
        <div className="mb-3" >
          <Breadcrumb
            items={[
              { text: "Home", route: "/" },
              { text: "Shop RTW", route: "/explore/shop-rtw" },
            ]}
          />
        </div>

        <h1 className="text-xl lg:text-[40px] mb-3.5"> {data?.title} </h1>

        <div className="max-w-[284px] lg:max-w-[396px]  m-auto text-center">
          <RichTextComponent
            textClassname="text-xs lg:text-sm text-brown-1500"
            richText={data?.description}
          />
        </div>
      </div>

      <ProductNavigation
        itemsPerPage={18}
        collectionKey={data?.collection_key}
      />

      <hr className="hidden lg:flex text-brown-light-1200 mt-9" />

      <ProductsHighlight
        filters={{
          by_color_filters,
          by_product_filters,
          by_new_arrivals_filters,
        }}
        itemsType="PRODUCTS"
        itemsPerPage={18}
        collectionKey={data?.collection_key}
      />

      <RecentlyViewed />
    </div>
  );
}

export const generateStaticParams = async () => {
  const data = await SanityClient().fetch(EXPLORE_PAGE_QUERY());

  return data.map((page: any) => ({
    slug: page.slug || "",
  }));
};
