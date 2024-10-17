import { removeUserData } from "@/utils/actions/user";
import MedusaClient from "@/utils/Medusa/MedusaClient";
import { Customer, Product, User } from "@medusajs/medusa";
import { userInfo } from "os";
import { create } from "zustand";
import { isEmpty } from "lodash";
import { Cart } from "medusa-react";

interface UserInfo {
  email: "";
  fullname: "";
  phone: "";
}

export interface ICustomerState {
  customer: null | Customer;

  // removeCustomerCartId: () => void;

  setCustomer: (customer?: Customer) => Promise<void>;
  bookmarkProduct: (product?: Product, bookmarks?: any) => void;
  removeBookmark: (product?: Product, bookmarks?: any) => void;
  updateCustomerInfo: ({ email, fullname, phone }: UserInfo) => void;
  logoutCustomer: () => void;
  modifyCustomerCartId: (cart?: Cart) => Promise<void>;

  updateBillingAddress: (address: any) => Promise<void>;
  // createCustomerAccount: ({ email, password, fullname }:  ) => Promise<void>;
}

const initialState: Pick<ICustomerState, "customer"> = {
  customer: null,
};

export const useCustomerStore = create<ICustomerState>((set) => ({
  ...initialState,

  // createCustomerAccount: async ({ email, password, fullname }) => {
  //   try {

  //     const customer = await = medusa.customers.create({
  //       first_name: "Alec",
  //       last_name: "Reynolds",
  //       email: "user@example.com",
  //       password: "supersecret"
  //     })

  //   } catch (error) {
  //     console.error("Error setting customer data");
  //   }
  // },

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

  removeBookmark: async (product, bookmarks = {}) => {
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

  updateBillingAddress: async (address) => {
    console.log("BILLING ADDRESS =>", address);

    console.log("CREATE BILLING ADDRESS =>", address);

    try {
      const stripFullname = address.fullName.split(" ");

      const { customer } = await MedusaClient.customers.addresses.addAddress({
        address: {
          // first_name: stripFullname[0] || "",
          // last_name: stripFullname[1] || "",
          // address_1: address.address,
          // city: address.city,
          // country_code: "ng",
          // postal_code: address.postalCode,
          // phone: address.phoneNumber,

          first_name: "Celia",
          last_name: "Schumm",
          address_1: "225 Bednar Curve",
          address_2: "225 Bednar Curve",
          city: "Danielville",
          country_code: "US",
          postal_code: "85137",
          phone: "981-596-6748 x90188",
          company: "Wyman LLC",
          province: "Georgia",
          metadata: { }
        },
      });

      return set({ customer });
    } catch (error) {
      console.error("Error updating billing address", error);
    }
  },

  bookmarkProduct: async (product, bookmarks = {}) => {
    try {
      let allBookmarks;

      // medusa engine throws non-iterable error
      if (isEmpty(bookmarks)) {
        allBookmarks = [product];
      } else {
        allBookmarks = [...bookmarks, product];
      }

      const { customer } = await MedusaClient.customers.update({
        metadata: {
          bookmarks: allBookmarks,
        },
      });

      return set({ customer });
    } catch (error) {
      console.error("Error bookmarking product", error);
    }
  },

  modifyCustomerCartId: async (cart?: Cart) => {
    try {
      const { customer } = await MedusaClient.customers.update({
        metadata: {
          cartId: !cart ? null : cart?.id,
        },
      });

      return set({ customer });
    } catch (error) {
      console.log(error);
    }
  },

  updateCustomerInfo: async ({ fullname, email, phone }) => {
    try {
      const stripFullname = fullname.split(" ");

      const { customer } = await MedusaClient.customers.update({
        first_name: stripFullname[0] || "",
        last_name: stripFullname[1] || "",
        email,
        phone,
      });

      return set({ customer });
    } catch (error) {
      console.error("Error updating customer data", error);
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
