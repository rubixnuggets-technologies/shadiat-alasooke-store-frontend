import MedusaClient from "@/utils/Medusa/MedusaClient";
import { create } from "zustand";

interface ISearchState {
  isOpen: boolean;
  searchText: string;
  searchItems: Array<any> | null;

  toggleSearch: ({ isVisible }: { isVisible?: boolean }) => void;
  setSearchText: (text: string) => Promise<void>;
  resetSearch: () => void;
}

const initialState = {
  isOpen: false,
  searchText: "",
  searchItems: null,
};

export const useSearchStore = create<ISearchState>((set) => ({
  ...initialState,
  
  toggleSearch: ({ isVisible }) => {
    set((state) => ({
      isOpen: isVisible ? isVisible : !state.isOpen,
      searchItems: null,
    }));
  },
  setSearchText: async (text) => {
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
  resetSearch: () => set({ ...initialState }),
}));
