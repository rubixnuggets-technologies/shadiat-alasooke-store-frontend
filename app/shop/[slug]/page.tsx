import MedusaClient from "@/utils/Medusa/MedusaClient";
import { notFound } from "next/navigation";
import ProductDetails from "@/src/components/Product/ProductDetails";

const getPage = async (slug: string) => {
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

const Page = async ({ params }) => {
  const { product } = await getPage(params?.slug);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Page;
