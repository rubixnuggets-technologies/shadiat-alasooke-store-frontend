import { SanityClient } from "@/utils/Sanity/client";
import { ALL_PRODUCTS_QUERY } from "@/utils/Sanity/gqols";

const getAllProducts = async () => {
  const products = await SanityClient().fetch(ALL_PRODUCTS_QUERY);

  return {
    products,
  };
};

const Page = async () => {
  const data = await getAllProducts();

  return (
    <div>
      <h1>Shop Page</h1>

      <div>
        <p>{JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default Page;
