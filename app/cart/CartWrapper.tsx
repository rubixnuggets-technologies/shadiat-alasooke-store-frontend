"use client";
import CartCost from "@/src/components/Cart/CartCost";
import CartTable from "@/src/components/Cart/CartTable";
import CheckoutForm from "@/src/components/Cart/CheckoutForm";
import PaymentForm from "@/src/components/Cart/PaymentForm";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import { ICheckoutState, useCartStore } from "@/src/state/cart";
import { useEffect } from "react";
import cn from "classnames";
import PaymentSuccess from "@/src/components/Payment/PaymentSuccess";
import { useCustomerStore } from "@/src/state/customer";

const CheckoutStage = ({
  checkoutStage,
}: {
  checkoutStage: ICheckoutState;
}) => {
  switch (checkoutStage) {
    case "CART_VIEW":
      return (
        <div className="flex flex-col lg:grid lg:grid-cols-[732px_auto]">
          <CartTable />

          <div className="flex mt-12 lg:mt-1 justify-center lg:justify-end">
            <CartCost />
          </div>
        </div>
      );

    case "CHECKOUT_VIEW":
      return <CheckoutForm />;

    case "PAYMENT_VIEW":
      return <PaymentForm />;

    case "PAYMENT_SUCCESS":
      return (
        <div>
          <PaymentSuccess />
        </div>
      );

    default:
      return <></>;
  }
};

const checkoutStageNames = (checkoutStage: ICheckoutState) => {
  switch (checkoutStage) {
    case "CART_VIEW":
      return "My Cart";

    case "CHECKOUT_VIEW":
      return "Checkout";

    case "PAYMENT_VIEW":
      return "Payment";

    default:
      return "";
  }
};

export default function CartWrapper() {
  const { checkoutStage, setCart, cart } = useCartStore();
  const { customer } = useCustomerStore();

  useEffect(() => {
    if (!customer) return;

    (async () => {
      await setCart({ cart_id: customer?.metadata?.cartId });
    })();
  }, [customer]);

  return (
    <div>
      {checkoutStage !== "PAYMENT_SUCCESS" && (
        <div className="mb-2 lg:mb-16">
          <div className="mb-12">
            <div className="flex justify-center">
              <Breadcrumb
                items={[
                  { route: "/", text: "Home" },
                  { route: "/cart", text: "Cart" },
                ]}
              />
            </div>

            <h1 className="text-[30px] lg:text-[40px] text-center">
              {checkoutStageNames(checkoutStage)}{" "}
            </h1>
          </div>

          <hr className="text-brown-1000" />

          <div>
            <div className="flex flex-row gap-4 mt-7 lg:mt-9">
              <h3
                className={cn(
                  "text-sm lg:text-xl",
                  checkoutStage === "CART_VIEW"
                    ? "text-brown-1500"
                    : "text-brown-500"
                )}
              >
                Cart
              </h3>

              <span>{">"}</span>

              <h3
                className={cn(
                  "text-sm lg:text-xl",
                  checkoutStage === "CHECKOUT_VIEW"
                    ? "text-brown-1500"
                    : "text-brown-500"
                )}
              >
                Check out
              </h3>

              <span>{">"}</span>

              <h3
                className={cn(
                  "text-sm lg:text-xl",
                  checkoutStage === "PAYMENT_VIEW"
                    ? "text-brown-1500"
                    : "text-brown-500"
                )}
              >
                Payment
              </h3>
            </div>
          </div>
        </div>
      )}

      <CheckoutStage checkoutStage={checkoutStage} />
    </div>
  );
}
