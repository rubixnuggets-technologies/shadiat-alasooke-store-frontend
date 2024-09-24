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
  setPaymentDetail: (key: string, value: string) => void;

  createCart: () => void;
  addDeliveryAddress: ({
    cartId,
    deliveryDetails,
  }: {
    cartId: string;
    deliveryDetails: any;
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
  checkoutStage: CHECKOUT_VIEW,

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

  createCart: async () => {
    try {
      const cart = await MedusaClient.carts.create();

      return cart;
    } catch (e) {
      console.log(e);
    }
  },

  addDeliveryAddress: async ({ cartId, deliveryDetails }) => {
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
          country_code: "gb",
          postal_code: deliveryDetails.postalCode,
          phone: deliveryDetails.phoneNumber,
        },
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

    setPaymentDetail: (key: string, value: string) =>
      set((state: ICheckoutState) => ({
        paymentDetails: {
          ...state.paymentDetails,
          [key]: value,
        },
      })),
}));
