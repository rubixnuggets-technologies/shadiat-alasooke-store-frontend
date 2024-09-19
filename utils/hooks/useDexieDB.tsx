import { Product } from "@medusajs/medusa";
import { db } from "@/utils/Storage/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useDexieDB = (pathname?: Product['handle']) => {
  const products = useLiveQuery(
    async () =>
      await db.recently_viewed_products
        .where("handle")
        .notEqual(`${pathname}`)
        .toArray()
  );

  const storeProduct = async (product?: Product) => {
    if (!product) return;

    try {
      const doesProductExist = await db.recently_viewed_products.get({
        id: product.id,
      });

      if (!doesProductExist) {
        return await db.recently_viewed_products.add(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    storeProduct,
    products,
  };
};
