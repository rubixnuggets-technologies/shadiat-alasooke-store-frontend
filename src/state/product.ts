import { Product } from "@medusajs/product";
import { create } from "zustand";

export interface IProductState {
  isFilterPaneVisible: boolean;
  products: Product[] | null;

  toggleFilterPane: () => void;

  queryProducts: (filter: string[]) => void;
}

const initialState: Pick<IProductState, "isFilterPaneVisible" | "products"> = {
  isFilterPaneVisible: true,

  products: null,
};

export const useProductStore = create<IProductState>((set) => ({
  ...initialState,

  toggleFilterPane: () =>
    set((state) => ({ isFilterPaneVisible: !state.isFilterPaneVisible })),

  queryProducts: async (filter) => {
    try {
      const request = await fetch(
        `/api/products?query=${JSON.stringify(filter)}`
      );

      const { data } = await request.json();

      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
