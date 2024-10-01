"use client";

import { PaymentSession } from "@medusajs/medusa";
import Button from "../ui/button";
import { PaystackButton } from "react-paystack";
import { useCartStore } from "@/src/state/cart";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/actions/user";

interface PaymentProviderProps {
  cart: any;
  paymentSession: PaymentSession;
}

export default function PaymentProvider() {
  const { cart } = useCartStore();

  // console.log(
  //   "PaymentProvider CART ->",
  //   cart
  // );

  // console.log(
  //   "PaymentProvider paymentSession ->",
  //   cart?.payment_session
  // );
  

  if (!cart || !cart?.payment_session) return null;
  const [ user, setUser ] = useState(null)

  useEffect(() => { 
    (async () => {
      const user = await getUserData();
      setUser(user)
    })()
  }, [])

  const { completeCartOrder } = useCartStore();
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  if (!PAYSTACK_PUBLIC_KEY) {
    throw new Error("PAYSTACK_PUBLIC_KEY is not set");
  }

  switch (cart?.payment_session?.provider_id) {
    case "stripe":
      return (
        <div>
          <div>
            <Button width="full" title="Continue to Payment" />
          </div>
        </div>
      );
    case "paystack":
      return (
        <div>
          <PaystackButton
            amount={cart?.total}
            email={user?.email}
            currency={cart?.region?.currency_code.toUpperCase()}
            publicKey={PAYSTACK_PUBLIC_KEY}
            onSuccess={async () => {
              await completeCartOrder(cart?.id);

              console.log("PAYMENT SUCCESS!");
            }}
            onClose={() => {
              console.log("PAYMENT WINDOW CLOSED!");
            }}
            reference={cart?.payment_session?.data?.paystackTxRef}
            className="w-full"
          >
            <Button width="full" title="Continue to Payment" />
          </PaystackButton>
        </div>
      );

    default:
      return (
        <div>
          <p> Default Payment Option </p>
        </div>
      );
  }
}
