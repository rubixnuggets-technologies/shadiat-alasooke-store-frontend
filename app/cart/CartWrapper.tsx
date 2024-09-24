"use client";
import CartCost from "@/src/components/Cart/CartCost";
import CartSummary from "@/src/components/Cart/CartSummary";
import CartTable from "@/src/components/Cart/CartTable";
import CheckoutForm from "@/src/components/Cart/CheckoutForm";
import PaymentForm from "@/src/components/Cart/PaymentForm";
import { CART_VIEW, CHECKOUT_VIEW, useCartStore } from "@/src/state/cart";
import { useDexieDB } from "@/utils/hooks/useDexieDB";
import { Cart } from "medusa-react";
import { useEffect, useState } from "react";

export default function CartWrapper() {
  const cartStore = useCartStore();

  const [currentCart, setCart] = useState<Cart | null>(null);
  const { getCart, cartId } = useDexieDB();

  console.log(currentCart);
  

  useEffect(() => {
    if (!cartId) return;

    (async () => {
      const data: Cart = await getCart(cartId as string);

      setCart(data);
    })();
  }, [cartId]);

  return (
    <div>
      {cartStore?.checkoutStage === CART_VIEW ? (
        <div>
          <div>
            <div className="mb-12">
              <h1 className="text-[40px] text-center">My Cart</h1>
            </div>

            <hr className="text-brown-1000" />
          </div>

          <div className="layout">
            <div className="mt-12 grid grid-cols-[732px_auto]">
              <CartTable cart={currentCart} />

              <div className="flex justify-end">
                <CartCost cart={currentCart} />
              </div>
            </div>
          </div>
        </div>
      ) : cartStore?.checkoutStage === CHECKOUT_VIEW ? (
        <div className=" grid grid-cols-2 gap-32">
          <CheckoutForm />
          <CartSummary cart={currentCart} />
        </div>
      ) : (
        <div className=" grid grid-cols-2 gap-32">
          <PaymentForm />
          <CartSummary cart={currentCart} />
        </div>
      )}
    </div>
  );
}
