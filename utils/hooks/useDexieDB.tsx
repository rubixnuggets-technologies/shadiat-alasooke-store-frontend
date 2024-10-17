import { Product } from "@medusajs/medusa";
import { db } from "@/utils/Storage/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Cart } from "medusa-react";
import MedusaClient from "../Medusa/MedusaClient";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/state/cart";

export const useDexieDB = (pathname?: Product["handle"]) => {
  const router = useRouter();

  const { setCart } = useCartStore();

  // const products = useLiveQuery(
  //   async () =>
  //     await db.recently_viewed_products
  //       .where("handle")
  //       .notEqual(`${pathname}`)
  //       .toArray()
  // );

  // const getCart = async (cart_id: string) => {
  //   if (!cart_id) return null;

  //   // try {
  //   const { cart } = await MedusaClient.carts.retrieve(cart_id);

  //   return cart;
  //   // } catch (error) {
  //   //   console.log("GET CART ERR:", error);
  //   // }
  // };

  // const storeProduct = async (product?: Product) => {
  //   if (!product) return;

  //   try {
  //     const doesProductExist = await db.recently_viewed_products.get({
  //       id: product.id,
  //     });

  //     if (!doesProductExist) {
  //       return await db.recently_viewed_products.add(product);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addProductToCart = async ({
  //   variant_id,
  //   quantity,
  //   cart_id,
  // }: {
  //   variant_id: string;
  //   quantity: number;
  //   cart_id: string;
  // }) => {
  //   try {
  //     const cart = await MedusaClient.carts.lineItems.create(cart_id, {
  //       variant_id,
  //       quantity,
  //     });

  //     return cart;
  //   } catch (error) {
  //     console.log("ADD TO CART ERR:", error);
  //   }
  // };

  // const removeProductFromCart = async ({
  //   item_id,
  //   cart_id,
  // }: {
  //   item_id: string;
  //   cart_id: string;
  // }) => {
  //   try {
  //     const cart = await MedusaClient.carts.lineItems.delete(cart_id, item_id);

  //     return setCart({ cart });
  //   } catch (error) {
  //     console.log("REMOVE FROM CART ERR:", error);
  //   }
  // };

  // const updateProductInCart = async ({
  //   item_id,
  //   cart_id,
  //   quantity,
  // }: {
  //   item_id: string;
  //   cart_id: string;
  //   quantity: number;
  // }) => {
  //   try {
  //     const { cart } = await MedusaClient.carts.lineItems.update(
  //       cart_id,
  //       item_id,
  //       {
  //         quantity,
  //       }
  //     );

  //     setCart({ cart });

  //     return cart;
  //   } catch (error) {
  //     console.log("UPDATE CART ITEM ERR:", error);
  //   }
  // };

  return {
    // storeProduct,
    // addProductToCart,
    // getCart,
    // removeProductFromCart,
    // updateProductInCart,

    // products,
  };
};
