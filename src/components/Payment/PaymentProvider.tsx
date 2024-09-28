"use client";

import { PaymentSession } from "@medusajs/medusa";
import Button from "../ui/button";
import { PaystackButton } from "react-paystack";
import { useCartStore } from "@/src/state/cart";

interface PaymentProviderProps {
  cart: any;
  paymentSession: PaymentSession;
}

export default function PaymentProvider({
  cart,
  paymentSession,
}: PaymentProviderProps) {
  if (!cart || !paymentSession) return null;

  const { completeCartOrder } = useCartStore();

  // console.log("PAYMENT SESSION: =>", paymentSession);
  // console.log("CART: =>", cart);

  const PAYSTACK_PUBLIC_KEY =
    "pk_test_93cb82cb04d2d40bbbc13bba150817535f2e3037";

  switch (paymentSession?.provider_id) {
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
            {/* <PaystackButton
              amount={cart?.total}
              email="Vickywane@gmail.com"
              currency={cart?.region?.currency_code.toUpperCase()}
              publicKey={PAYSTACK_PUBLIC_KEY}
              onSuccess={async () => {
                await completeCartOrder(cart?.id);

                console.log("PAYMENT SUCCESS!");
              }}
              onClose={() => {
                console.log("PAYMENT WINDOW CLOSED!");
              }}
              reference={paymentSession?.data?.paystackTxRef}
              className="w-full"
            >
              <Button width="full" title="Continue to Payment" />
            </PaystackButton> */}
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
