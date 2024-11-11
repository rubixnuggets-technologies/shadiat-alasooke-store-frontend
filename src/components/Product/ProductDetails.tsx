"use client";
import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductGallery from "./ProductGallery";
import { formatCurrency } from "@/utils/helpers/formatter";
import { Product } from "@medusajs/medusa";
import { useCartStore } from "@/src/state/cart";
import { useRegions } from "medusa-react";
import { getUserData } from "@/utils/actions/user";
import { useCustomerStore } from "@/src/state/customer";
import Breadcrumb from "../ui/Breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "../loaders/Spinner";
import { isEmpty } from "lodash";
import classNames from "classnames";

const ProductDetails = ({ product }: { product: Product }) => {
  const [itemVariant, setVariant] = useState(product?.variants[0]);
  const router = useRouter();

  const { customer, bookmarkProduct, removeBookmark, modifyCustomerCartId } =
    useCustomerStore();

  const [productQuantity, setProductQuantity] = useState(1);
  const { addProductToCart, storeRecentlyViewedProduct, status } =
    useCartStore();

  const pathname = usePathname();

  useEffect(() => {
    if (product) {
      storeRecentlyViewedProduct(product);
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

    if (!customer?.metadata?.cartId) {
      const { cart: createdCart } = await cartStore?.createCart(
        userLocalRegion?.id,
        user?.id
      );

      await modifyCustomerCartId(createdCart);

      await addProductToCart({
        variant_id: itemVariant?.id,
        quantity: productQuantity,
        cart_id: createdCart?.id,
      });

      router.push("/cart");

      return;
    }

    await addProductToCart({
      variant_id: itemVariant?.id,
      quantity: productQuantity,
      cart_id: customer?.metadata?.cartId,
    });
  };

  const productBookmark = useMemo(() => {
    if (customer?.metadata?.bookmarks) {
      return customer?.metadata?.bookmarks?.find(
        (item: Product) => item.id === product.id
      );
    }
  }, [customer]);

  return (
    <div className="layout">
      <div className="flex mt-2 mb-12 justify-center">
        <Breadcrumb
          items={[
            { route: "/", text: "Home" },
            { route: "/ready-to-wear", text: "Ready To Wear" },
            { route: pathname, text: product?.title },
          ]}
        />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="max-w-full mt-20 lg:mt-0 lg:max-w-[466px]">
          <div>
            <h1 className="text-brown-1500 text-sm">By Dresses</h1>
            <p className="text-brown-2100 mt-2xl lg:text-3xl">
              {product?.title}
            </p>

            {itemVariant && (
              <div className="mt-4 lg:mt-8 flex flex-row ">
                <p className="text-base lg:text-lg text-brown-2100">
                  {formatCurrency(
                    itemVariant?.prices[0]?.amount * productQuantity
                  )}
                </p>

                {itemVariant?.inventory_quantity <= 0 ? (
                  <div className="ml-4 flex flex-row">
                    <div className="flex items-center">
                      <div className="h-[8px] w-[8px] rounded-full bg-coral-700" />
                    </div>
                    <p className="text-coral-700 ml-2 text-base text-italic">
                      out of stock{" "}
                    </p>
                  </div>
                ) : (
                  itemVariant?.inventory_quantity <= 4 && (
                    <div className="ml-4 flex flex-row">
                      <div className="flex items-center">
                        <div className="h-[8px] w-[8px] rounded-full bg-gold-1400 " />
                      </div>
                      <p className="text-gold-1400 ml-2 text-base text-italic">
                        Low on stock{" "}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            <p className="my-6 lg:my-8 text-sm lg:text-base leading-[30px] ">
              {product?.description}
            </p>
          </div>

          <div>
            {isEmpty(product?.variants) ? (
              <div className="flex mb-4 flex-row">
                <div className="flex items-center">
                  <div className="h-[8px] w-[8px] rounded-full bg-coral-700" />
                </div>
                <p className="text-coral-700 ml-2 text-base text-italic">
                  out of stock{" "}
                </p>
              </div>
            ) : (
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
            )}
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
                onClick={() => {
                  if (
                    isEmpty(product?.variants) ||
                    itemVariant?.inventory_quantity <= 0
                  ) {
                    return;
                  }

                  handleAddToCart();
                }}
                className={classNames(
                  "border-[1px] h-12 flex items-center justify-center hover:cursor-pointer",
                  (isEmpty(product?.variants) ||
                    itemVariant?.inventory_quantity <= 0) &&
                    "opacity-50"
                )}
              >
                <div className="mr-4 flex items-center">
                  <p className="uppercase"> Add To Cart </p>
                </div>

                {status === "LOADING" && <Spinner />}
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
