import MedusaClient from "@/utils/Medusa/MedusaClient";
import { create } from "zustand";
import { AddressPayload } from "@medusajs/medusa";
import { Cart } from "medusa-react";
import zukeeper from "zukeeper";

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

export interface ICheckoutState {
  checkoutStage:
    | "CART_VIEW"
    | "CHECKOUT_VIEW"
    | "PAYMENT_VIEW"
    | "PAYMENT_SUCCESS";

  cart: Cart | null;
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
  createCart: (regionId?: string, customerId?: string) => Promise<any>;
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
  setCart: ({ cart_id, cart }: { cart_id?: string; cart?: Cart }) => void;
}

export const CART_VIEW = "CART_VIEW";
export const CHECKOUT_VIEW = "CHECKOUT_VIEW";
export const PAYMENT_VIEW = "PAYMENT_VIEW";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";

const initialState: Pick<
  ICheckoutState,
  "cart" | "checkoutStage" | "deliveryDetails" | "paymentDetails"
> = {
  checkoutStage: PAYMENT_VIEW,
  cart: null,

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

        const { cart } = await MedusaClient.carts.update(response?.cart?.id, {
          customer_id: customerId,
        });

        set({ cart });

        return response;
      } catch (e) {
        console.log(e);
      }
    },

    setCart: async ({ cart_id, cart }) => {
      if (!cart_id && !cart) return null;

      if (cart) {
        return set({ cart: cart });
      }

      try {
        const { cart } = await MedusaClient.carts.retrieve(cart_id);

        return set({ cart: cart });
      } catch (error) {
        console.log("GET CART ERR:", error);
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

        const { cart } = await MedusaClient.carts.createPaymentSessions(
          cartId,
          {
            "Idempotency-Key": IDEMPOTENCY_KEY,
          }
        );

        const paystack = cart?.payment_sessions?.find(
          (session) => session?.provider_id === "paystack"
        );

        const { cart: cartWithPaymentSession } =
          await MedusaClient.carts.setPaymentSession(cartId, {
            provider_id: paystack?.provider_id,
          });

        console.log("CART WITH PAYMENT SESSION STORE", cartWithPaymentSession);

        set({ cart: cartWithPaymentSession });
        set({ checkoutStage: "PAYMENT_VIEW" });

        return cart;
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
        set({ checkoutStage: "PAYMENT_SUCCESS" });

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

    removeCart: async ({ cartId }) => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  })
);

// window.store = useCartStore;

// export { useCartStore };
