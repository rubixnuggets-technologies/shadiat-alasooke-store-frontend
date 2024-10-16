import MedusaClient from "@/utils/Medusa/MedusaClient";
import { notFound } from "next/navigation";
import ProductDetails from "@/src/components/Product/ProductDetails";
import { Product } from "@medusajs/medusa";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import Breadcrumb from "@/src/components/ui/Breadcrumb";

const getPage = async (slug: string): Promise<{ product: Product }> => {
  try {
    const { products } = await MedusaClient.products.list({
      handle: slug,
    });

    if (!products) return notFound();

    return {
      product: products[0],
    };
  } catch (error) {
    return notFound();
  }
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const { product } = await getPage(params?.slug);

  return (
    <div>
      <ProductDetails product={product} />

      <RecentlyViewed currentProduct={product.handle} />
    </div>
  );
};

export default Page;
