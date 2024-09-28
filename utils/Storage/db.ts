import Dexie, { type EntityTable } from "dexie";
import { Product, Cart } from "@medusajs/medusa";

export const PRODUCT_DATABASE = "shadiat-products-local-store-db";

interface CustomCartEntity extends Cart { 
  id: string
}

const db = new Dexie(PRODUCT_DATABASE) as Dexie & {
  recently_viewed_products: EntityTable<Product, "id">;
  cart: EntityTable<Cart, "id">;
};

// TODO: NOTE: Don’t declare all columns like in SQL. You only declare properties you want to index, that is properties you want to use in a where(…) query.
// db.version(1).stores({
//   recently_viewed_products:
//     "id, title, subtitle, description, handle, is_giftcard, status, images, thumbnail, options, variants, categories, profile_id, profile, profiles, weight, length, height, width, origin_country, material, collection_id, collection, type_id, type, tags,  discountable,  external_id, metadata, sales_channels",
//   cart: "id, email, billing_address_id, billing_address, shipping_address_id, shipping_address, items, region_id, region, discounts, gift_cards, customer_id, customer, payment_session, payment_sessionsmetadata, payment_idmetadata, paymentmetadata, shipping_methodsmetadata, typemetadata, completed_atmetadata, payment_authorized_atmetadata, idempotency_keymetadata, contextmetadata, metadata, sales_channel_id, sales_channel, sales_channels, shipping_total, discount_total, raw_discount_total, item_tax_total, shipping_tax_total, tax_total, refunded_total, total, subtotal, refundable_amount, gift_card_total, gift_card_tax_total",
// });

db.version(1).stores({
  recently_viewed_products:
    "id, title, subtitle, description, handle, is_giftcard, status, images, thumbnail, options, variants, categories, profile_id, profile, profiles, weight, length, height, width, origin_country, material, collection_id, collection, type_id, type, tags,  discountable,  external_id, metadata, sales_channels",
  cart: "id, billing_address_id, shipping_address_id, region_id,  customer_id, customer",
});

export { db };
