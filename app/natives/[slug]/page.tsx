import PreOrderForm from "@/src/components/forms/Preorder";
import ProductGallery from "@/src/components/Product/ProductGallery";
import RecentlyViewed from "@/src/components/Product/RecentlyViewed";
import MedusaClient from "@/utils/Medusa/MedusaClient";

import { initialize as initializeProductModule } from "@medusajs/product";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/src/components/MarkdownRenderer";
import Breadcrumb from "@/src/components/ui/Breadcrumb";

const NATIVE_PRODUCTS_COLLECTION_KEY = "pcol_01J77YW8NCQZTYCTHXWM7GPJRY";

const getNativeProducts = async (slug: string) => {
  try {
    const { products } = await MedusaClient.products.list({
      handle: slug,
    });

    return {
      product: products[0],
    };
  } catch (error) {
    console.log(error);

    return notFound();
  }
};

export default async function CartWrapper({ params: { slug } }) {
  const { product } = await getNativeProducts(slug);

  return (
    <div>
      <div className="flex justify-center mt-2 lg:mt-6 mb-8 lg:mb-20">
        <Breadcrumb
          items={[
            {
              route: "/shop-aso-oke",
              text: "Shop Aso Oke",
            },
            {
              route: `/natives/${slug}`,
              text: product?.title,
            },
          ]}
        />
      </div>

      <div >
        <div className="layout">
          <div className="flex flex-col lg:grid lg:grid-cols-[732px_auto]">
            <ProductGallery product={product} />

            <div>
              <div>
                <h1 className="text-brown-light-1500 text-xs lg:text-base">
                  By Dresses
                </h1>
                <p className="text-base lg:text-3xl mt-1 lg:mt-3">
                  {" "}
                  {product?.title}{" "}
                </p>
                <p className="text-base font-bold mt-5 lg:mt-10">
                  Product Overview:
                </p>
                <p className="text-[11px] lg:text-sm text-brown-dark-1500 mt-1 lg:mt-2">
                  {product?.description}
                </p>
              </div>

              <div>
                <p className="text-base font-bold mt-2 lg:mt-10">
                  Pre-Order Form:
                </p>
                <p className="text-[11px] lg:text-sm text-brown-dark-1500 mt-1 lg:mt-2">
                  Please fill out the form below to pre-order your Aso Oke. We
                  will get back to you soon for further details
                </p>

                <PreOrderForm />
              </div>
            </div>
          </div>

          <div className="mt-20 lg:mt-24">
            <h1 className="text-base lg:text-3xl text-brown-2100">
              Product Specifications
            </h1>

            <hr className="my-4 lg:my-10" />

            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[732px_auto]">
              <div className="bg-brown-light-100 px-12 lg:px-16 pb-6 lg:pb-9 rounded-xl">
                <MarkdownRenderer
                  content={product?.metadata?.LEFT_COLUMN_SPEC as string}
                />
              </div>

              <div className="bg-brown-light-100 px-12 lg:px-16 pb-6 lg:pb-9 rounded-xl">
                <MarkdownRenderer
                  content={product?.metadata?.RIGHT_COLUMN_SPEC as string}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed />
    </div>
  );
}

export const generateStaticParams = async () => {
  try {
    const productService = await initializeProductModule();

    const { products } = await productService.retrieveCollection(
      NATIVE_PRODUCTS_COLLECTION_KEY,
      {
        relations: ["products"],
      }
    );

    return products?.map(({ handle }) => ({
      slug: handle || "",
    }));
  } catch (error) {
    console.log(error);
  }
};
