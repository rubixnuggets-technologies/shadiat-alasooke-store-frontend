import MedusaClient from "@/utils/Medusa/MedusaClient";
import { create } from "zustand";

interface initialSearchState {
  isOpen: boolean;
  toggleSearch: () => void;
}

const initialState = {
  isOpen: false,
  searchText: "",
  searchItems: null,
};

export const useSearchStore = create((set) => ({
  ...initialState,
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
  setSearchText: async (text: string) => {
    set({ searchText: text });

    if (text.length >= 2) {
      try {
        const { hits } = await MedusaClient.products.search({ q: text });

        return set({ searchItems: hits });
      } catch (e) {
        console.log(e);
      }
    } else {
      set({ searchItems: null, searchText: "" });
    }
  },
  // executeSearch: async (text: string) => {
  //   try {
  //     const { hits } = await MedusaClient.products.search({ q: text });

  //     return set({ searchItems: hits });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
}));
