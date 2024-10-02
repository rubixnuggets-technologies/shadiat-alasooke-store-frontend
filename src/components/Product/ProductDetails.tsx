"use client";
import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductGallery from "./ProductGallery";
import { formatCurrency } from "@/utils/helpers/formatter";
import { Product } from "@medusajs/medusa";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { useCartStore } from "@/src/state/cart";
import { useRegions } from "medusa-react";
import { getUserData } from "@/utils/actions/user";
import { useCustomerStore } from "@/src/state/customer";

const ProductDetails = ({ product }: { product: Product }) => {
  const [itemVariant, setVariant] = useState(product?.variants[0]);

  const { customer, bookmarkProduct, removeBookmark } = useCustomerStore();

  const [productQuantity, setProductQuantity] = useState(1);

  const { storeProduct, storeCart, cartId, addProductToCart, getCart } =
    useDexieDB();

  useEffect(() => {
    if (product) {
      storeProduct(product);
    }
  }, [product]);

  const { regions, isLoading: isRegionLoading } = useRegions();
  const cartStore = useCartStore();

  const handleAddToCart = async () => {
    // TODO: support fetching region through browswer geolocation
    const userLocalRegion = regions?.find(
      (region) => region.name === "Nigeria"
    );

    const user = await getUserData();

    if (!cartId) {
      const { cart: createdCart } = await cartStore?.createCart(
        userLocalRegion?.id,
        user?.id
      );

      await storeCart(createdCart);

      await addProductToCart({
        variant_id: itemVariant?.id,
        quantity: productQuantity,
        cart_id: createdCart?.id,
      });
      
      return;
    }

    await addProductToCart({
      variant_id: itemVariant?.id,
      quantity: 1,
      cart_id: cartId,
    });
  };

  const productBookmark = useMemo(() => {
    if (customer?.metadata) {
      return customer?.metadata?.bookmarks.find(
        (item: Product) => item.id === product.id
      );
    }
  }, [customer]);

  return (
    <div className="layout">
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="max-w-full mt-20 lg:mt-0 lg:max-w-[466px]">
          <div>
            <h1 className="text-brown-1500 text-sm">By Dresses</h1>
            <p className="text-brown-2100 mt-2xl lg:text-3xl">
              {product?.title}
            </p>

            {itemVariant && (
              <div className="mt-4 lg:mt-8">
                <p className="text-base lg:text-lg text-brown-2100">
                  {formatCurrency(
                    itemVariant?.prices[0]?.amount * productQuantity
                  )}
                </p>
              </div>
            )}

            <p className="my-6 lg:my-8 text-sm lg:text-base leading-[30px] ">
              {product?.description}
            </p>
          </div>

          <div>
            <div className="mb-8 flex flex-row">
              <div className="flex items-center mr-5 lg:mr-6">
                <p className="text-sm lg:text-lg"> Size </p>
              </div>

              <ul className="flex flex-row flex-wrap gap-4">
                {product?.variants.map((variant) => (
                  <li onClick={() => setVariant(variant)} key={variant?.id}>
                    <div
                      className={`flex py-2 lg:h-12 hover:cursor-pointer px-3 lg:px-6 items-center justify-center flex-row gap-2 lg:gap-3 ${itemVariant?.id === variant.id ? "border-[2px]" : "border-[1px]"} border-brown-1500`}
                    >
                      <p className="text-base lg:text-lg capitalize">
                        {variant?.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[80px_auto_80px] gap-2">
              <div className="flex h-12  max-w-[80px] items-center justify-center flex-row gap-2 lg:gap-3 border-[1px]">
                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    setProductQuantity((count) => {
                      if (count <= 1 && count - 1 < 1) return count;

                      return count - 1;
                    })
                  }
                >
                  <p className="text-base text-brown-1500 lg:text-lg ">-</p>
                </div>

                <div>
                  <p className="text-base text-brown-1500 lg:text-lg">
                    {" "}
                    {productQuantity}{" "}
                  </p>
                </div>

                <div
                  className="hover:cursor-pointer"
                  onClick={() => setProductQuantity((count) => count + 1)}
                >
                  <p className="text-base text-brown-1500 lg:text-lg">+</p>
                </div>
              </div>

              <div
                onClick={handleAddToCart}
                className="border-[1px] h-12  flex items-center justify-center hover:cursor-pointer"
              >
                <p className="uppercase"> Add To Cart </p>
              </div>

              {productBookmark ? (
                <div
                  onClick={() =>
                    removeBookmark(product, customer?.metadata?.bookmarks || {})
                  }
                  className="border-[1px] h-12 max-w-[80px] flex items-center justify-center hover:cursor-pointer"
                >
                  <FaHeart size={22} />
                </div>
              ) : (
                <div
                  onClick={() =>
                    bookmarkProduct(
                      product,
                      customer?.metadata?.bookmarks || {}
                    )
                  }
                  className="border-[1px] h-12 max-w-[80px] flex items-center justify-center hover:cursor-pointer"
                >
                  <FaRegHeart size={22} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
