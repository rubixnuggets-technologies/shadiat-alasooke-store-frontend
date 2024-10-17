"use client";
import CartCost from "@/src/components/Cart/CartCost";
import CartTable from "@/src/components/Cart/CartTable";
import CheckoutForm from "@/src/components/Cart/CheckoutForm";
import PaymentForm from "@/src/components/Cart/PaymentForm";
import { ICheckoutState, useCartStore } from "@/src/state/cart";
import { useEffect } from "react";
import cn from "classnames";
import PaymentSuccess from "@/src/components/Payment/PaymentSuccess";
import PagesHeroSection from "@/src/components/ui/PagesHeroSection";
import { usePathname } from "next/navigation";
import { isEmpty } from "lodash";

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

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    <g clip-path="url(#clip0_208_8561)">
      <path
        d="M8.036 7.32256L5.01539 4.30195L5.87825 3.43909L9.76172 7.32256L5.87825 11.206L5.01539 10.3432L8.036 7.32256Z"
        fill="#0C0B0A"
      />
    </g>
    <defs>
      <clipPath id="clip0_208_8561">
        <rect
          width="14.6454"
          height="14.6454"
          fill="white"
          transform="matrix(0 1 -1 0 14.6445 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

const pathnames = {
  CART_VIEW: "My Cart",
  CHECKOUT_VIEW: "Checkout",
  PAYMENT_VIEW: "Payment",
};

export default function CartWrapper() {
  const { checkoutStage, setCheckoutStage, checkoutHistory, cart } =
    useCartStore();
  const pathname = usePathname();

  useEffect(() => {
    // reset checkout stage on page change
    if (pathname !== "/cart" && checkoutStage !== "CART_VIEW") {
      setCheckoutStage("CART_VIEW");
    }
  }, [pathname]);

  return (
    <div>
      {isEmpty(cart?.items) ? (
        <div className="flex items-center justify-center h-[30vh] lg:h-[70vh]">
          <h1 className="text-center text-brown-dark-1500">
            You do not have any items <br /> in your cart
          </h1>
        </div>
      ) : (
        <div>
          {checkoutStage !== "PAYMENT_SUCCESS" && (
            <div className="mb-2 lg:mb-16">
              <PagesHeroSection
                breadcrumbItems={[
                  { route: "/", text: "Home" },
                  { route: pathname, text: pathnames[checkoutStage || ""] },
                ]}
                title={pathnames[checkoutStage || ""]}
              />

              <div>
                <div className="flex flex-row gap-2 lg:gap-3 mt-7 lg:mt-9">
                  <div
                    onClick={() =>
                      checkoutHistory.includes("CART_VIEW") &&
                      setCheckoutStage("CART_VIEW")
                    }
                    className={
                      checkoutHistory.includes("CART_VIEW")
                        ? "hover:cursor-pointer"
                        : ""
                    }
                  >
                    <h3
                      onClick={() => setCheckoutStage("CART_VIEW")}
                      className={cn(
                        "text-sm lg:text-xl",
                        checkoutStage === "CART_VIEW"
                          ? "text-brown-dark-2100"
                          : "text-brown-light-1500"
                      )}
                    >
                      Cart
                    </h3>
                  </div>

                  <div className="flex items-center">
                    <Arrow />
                  </div>

                  <div
                    onClick={() =>
                      checkoutHistory.includes("CHECKOUT_VIEW") &&
                      setCheckoutStage("CHECKOUT_VIEW")
                    }
                    className={
                      checkoutHistory.includes("CHECKOUT_VIEW")
                        ? "hover:cursor-pointer"
                        : ""
                    }
                  >
                    <h3
                      className={cn(
                        "text-sm lg:text-xl",
                        checkoutStage === "CHECKOUT_VIEW"
                          ? "text-brown-dark-2100"
                          : "text-brown-light-1500"
                      )}
                    >
                      Check out
                    </h3>
                  </div>

                  <div className="flex items-center">
                    <Arrow />
                  </div>

                  <div
                    onClick={() =>
                      checkoutHistory.includes("PAYMENT_VIEW") &&
                      setCheckoutStage("PAYMENT_VIEW")
                    }
                    className={
                      checkoutHistory.includes("PAYMENT_VIEW")
                        ? "hover:cursor-pointer"
                        : ""
                    }
                  >
                    <h3
                      className={cn(
                        "text-sm lg:text-xl",
                        checkoutStage === "PAYMENT_VIEW"
                          ? "text-brown-dark-2100"
                          : "text-brown-light-1500"
                      )}
                    >
                      Payment
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CheckoutStage checkoutStage={checkoutStage} />
        </div>
      )}
    </div>
  );
}
