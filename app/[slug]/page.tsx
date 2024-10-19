import ProductNavigation from "@/src/components/ExploreProducts/ProductNavigation";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import ProductsHighlight from "@/src/components/Products/ProductsHighlight";
import { SanityClient } from "@/utils/Sanity/client";
import { EXPLORE_PAGE_QUERY } from "@/utils/Sanity/gqols";
import { notFound, usePathname } from "next/navigation";
import CollectionHero from "../../src/components/CollectionHero";

const getPageData = async (slug: string) => {
  const data = await SanityClient().fetch(EXPLORE_PAGE_QUERY(slug));

  return { data: data[0] };
};

export default async function Page({ params }) {
  const { slug } = params;
  const { data } = await getPageData(slug);

  if (!data) notFound();

  const { by_color_filters, by_product_filters, by_new_arrivals_filters } =
    data;

  return (
    <div>
      <CollectionHero data={data} slug={slug} />

      <ProductNavigation
        filters={{
          by_color_filters,
          by_product_filters,
          by_new_arrivals_filters,
        }}
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
