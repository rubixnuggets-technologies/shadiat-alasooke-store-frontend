import MedusaClient from "@/utils/Medusa/MedusaClient";
import { create } from "zustand";
import { AddressPayload } from "@medusajs/medusa";

type IDeliveryDetail =
  | "fullName"
  | "address"
  | "email"
  | "phoneNumber"
  | "city"
  | "state"
  | "region"
  | "postalCode";

type IPaymentDetail =
  | "postalCode"
  | "cardName"
  | "cardPhoneNumber"
  | "cardNumber"
  | "cardCVC"
  | "cardRegion";

// type IDeliveryDetail =
//   | "postalCode"
//   | "cardName"
//   | "cardPhoneNumber"
//   | "cardNumber"
//   | "cardCVC"
//   | "cardRegion";

export interface ICheckoutState {
  checkoutStage: "CART_VIEW" | "CHECKOUT_VIEW" | "PAYMENT_VIEW";
  // checkoutDetails: Record<ICheckoutDetail, string>;

  deliveryDetails: Record<IDeliveryDetail, string>;
  paymentDetails: Record<IPaymentDetail, string>;

  setDeliveryDetail: (key: string, value: string) => void;
  setPaymentDetail: () => void;
  startPayment: ({
    cartId,
    paymentDetails,
  }: {
    cartId: string;
    paymentDetails: any;
  }) => void;
  removeCart: ({ cartId }: { cartId: string }) => void;
  completeCartOrder: (cartId: string) => void;
  createCart: (regionId?: string, customerId?: string) => void;
  addDeliveryAddress: ({
    cartId,
    deliveryDetails,
    deliveryMethod,
  }: {
    cartId: string;
    deliveryDetails: any;
    deliveryMethod: any;
  }) => void;
  setCheckoutStage: (stage: ICheckoutState["checkoutStage"]) => void;
}

export const CART_VIEW = "CART_VIEW";
export const CHECKOUT_VIEW = "CHECKOUT_VIEW";
export const PAYMENT_VIEW = "PAYMENT_VIEW";

const initialState: Pick<
  ICheckoutState,
  "checkoutStage" | "deliveryDetails" | "paymentDetails"
> = {
  checkoutStage: CART_VIEW,

  deliveryDetails: {
    fullName: "",
    region: "",
    city: "",
    postalCode: "",
    state: "",
    phoneNumber: "",
    address: "",
    email: "",
  },

  paymentDetails: {
    postalCode: "",
    cardName: "",
    cardPhoneNumber: "",
    cardNumber: "",
    cardCVC: "",
    cardRegion: "",
  },
};

export const useCartStore = create<ICheckoutState>((set) => ({
  ...initialState,

  setCheckoutStage: (stage: ICheckoutState["checkoutStage"]) =>
    set({ checkoutStage: stage }),

  createCart: async (regionId, customerId) => {
    try {
      const response = await MedusaClient.carts.create({
        region_id: regionId,
      });

      if (!response.cart) return null;

      await MedusaClient.carts.update(response?.cart?.id, {
        customer_id: customerId,
      });

      return response;
    } catch (e) {
      console.log(e);
    }
  },

  addDeliveryAddress: async ({ cartId, deliveryDetails, deliveryMethod }) => {
    if (!cartId) {
      return;
    }

    try {
      await MedusaClient.carts.update(cartId, {
        shipping_address: {
          first_name: deliveryDetails.fullName,
          last_name: deliveryDetails.fullName,
          address_1: deliveryDetails.address,
          city: deliveryDetails.city,
          country_code: "ng",
          postal_code: deliveryDetails.postalCode,
          phone: deliveryDetails.phoneNumber,
        },
      });

      await MedusaClient.carts.addShippingMethod(cartId, {
        option_id: deliveryMethod?.id,
      });

      const IDEMPOTENCY_KEY = "create_payment_session_key";

      const { cart } = await MedusaClient.carts.createPaymentSessions(cartId, {
        "Idempotency-Key": IDEMPOTENCY_KEY,
      });

      const paystack = cart?.payment_sessions?.find(
        (session) => session?.provider_id === "paystack"
      );

      await MedusaClient.carts.setPaymentSession(cartId, {
        provider_id: paystack?.provider_id
      });

      set({ checkoutStage: "PAYMENT_VIEW" });
    } catch (e) {
      console.log(e);
    }
  },

  setDeliveryDetail: (key: string, value: string) =>
    set((state: ICheckoutState) => ({
      deliveryDetails: {
        ...state.deliveryDetails,
        [key]: value,
      },
    })),

    completeCartOrder: async (cartId) => {
      try {
        await MedusaClient.carts.complete(cartId);
      } catch (e) {
        console.log(e);
      }
    },

  setPaymentDetail: (key: string, value: string) =>
    set((state: ICheckoutState) => ({
      paymentDetails: {
        ...state.paymentDetails,
        [key]: value,
      },
    })),

  // startPayment: async ({ cartId, paymentDetails }) => {
  //   try {
  //     const IDEMPOTENCY_KEY = "create_payment_session_key";

  //     const session = await MedusaClient.carts.createPaymentSessions(cartId, {
  //       "Idempotency-Key": IDEMPOTENCY_KEY
  //     });

  //     return session;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },

  removeCart: async ({ cartId }) => {
    try {
    } catch (e) {
      console.log(e);
    }
  },
}));
