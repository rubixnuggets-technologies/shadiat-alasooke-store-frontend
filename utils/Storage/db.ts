import Dexie, { type EntityTable } from "dexie";
import { Product } from "@medusajs/medusa";

export const PRODUCT_DATABASE = "shadiat-product-db";

const db = new Dexie(PRODUCT_DATABASE) as Dexie & {
  recently_viewed_products: EntityTable<Product, "id">;
};

db.version(1).stores({
  recently_viewed_products:
    "id, title, subtitle, description, handle, is_giftcard, status, images, thumbnail, options, variants, categories, profile_id, profile, profiles, weight, length, height, width, origin_country, material, collection_id, collection, type_id, type, tags,  discountable,  external_id, metadata, sales_channels",
});

export { db };
