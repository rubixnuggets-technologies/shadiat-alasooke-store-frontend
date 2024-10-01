import { removeUserData } from "@/utils/actions/user";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { Customer, Product } from "@medusajs/medusa";
import { create } from "zustand";

export interface ICustomerState {
  customer: null | Customer;

  setCustomer: (customer?: Customer) => void;
  bookmarkProduct: (product?: Product, bookmarks?: any) => void;
  removeBookmark: (product?: Product, bookmarks?: any) => void;
  logoutCustomer: () => void;
}

const initialState: Pick<ICustomerState, "customer"> = {
  customer: null,
};

export const useCustomerStore = create<ICustomerState>((set) => ({
  ...initialState,

  setCustomer: async (customer) => {
    if (customer) {
      set({ customer });
    }

    try {
      const { customer } = await MedusaClient.customers.retrieve();

      return set({ customer });
    } catch (error) {
      console.error("Error setting customer data");
    }
  },

  removeBookmark: async (product, bookmarks) => {
    try {
      const { customer } = await MedusaClient.customers.update({
        metadata: {
          bookmarks: bookmarks.filter((item) => item.id !== product.id),
        },
      });

      return set({ customer });
    } catch (error) {
      console.error("Error removing bookmark", error);
    }
  },

  bookmarkProduct: async (product, bookmarks) => {
    try {
      const { customer } = await MedusaClient.customers.update({
        metadata: {
          bookmarks: [...bookmarks, product],
        },
      });

      return set({ customer });
    } catch (error) {
      console.error("Error bookmarking product", error);
    }
  },

  logoutCustomer: async () => {
    try {
      await MedusaClient.auth.deleteSession();

      await removeUserData();

      return set(initialState);
    } catch (error) {
      console.error("Error bookmarking product", error);
    }
  },
}));
