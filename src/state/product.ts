import { Product } from "@medusajs/product";
import { create } from "zustand";

export interface IProductState {
  isFilterPaneVisible: boolean;
  products: Product[] | null;
  productsCount: number;
  status: "IDLE" | "LOADING" | "ERROR";

  toggleFilterPane: () => void;
  sortProducts: (sort: string, products?: Product[]) => void;

  queryProducts: ({
    filter,
    limit,
    collectionId,
    page,
  }: {
    filter?: string[];
    collectionId?: string;
    limit?: number;
    page?: number;
    sort?: string;
  }) => void;
}

const initialState: Pick<
  IProductState,
  "productsCount" | "isFilterPaneVisible" | "products" | "status"
> = {
  isFilterPaneVisible: true,
  status: "IDLE",
  products: null,
  productsCount: 0,
};

export const useProductStore = create<IProductState>((set) => ({
  ...initialState,

  toggleFilterPane: () =>
    set((state) => ({ isFilterPaneVisible: !state.isFilterPaneVisible })),

  sortProducts: async (sort, products) => {
    if (!products) return;
  },

  queryProducts: async ({ filter = [], limit, collectionId, page, sort }) => {
    set({
      status: "LOADING",
    });

    try {
      const request = await fetch(
        `/api/products?query=${JSON.stringify(filter)}&limit=${limit}&page=${page}&collection=${collectionId}&sort=${sort}`
      );

      const { data } = await request.json();

      set({ products: data?.products, productsCount: data?.total, status: "IDLE" });
    } catch (error) {
      set({
        status: "ERROR",
      });

      console.log(error);
    }
  },
}));
