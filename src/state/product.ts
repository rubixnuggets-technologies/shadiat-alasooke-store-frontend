import { Product } from "@medusajs/product";
import { create } from "zustand";
import { sortBy, sumBy } from "lodash";

export interface IProductState {
  isFilterPaneVisible: boolean;
  products: Product[] | null;
  productsCount: number;

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
  "productsCount" | "isFilterPaneVisible" | "products"
> = {
  isFilterPaneVisible: true,

  products: null,
  productsCount: 0,
};

export const useProductStore = create<IProductState>((set) => ({
  ...initialState,

  toggleFilterPane: () =>
    set((state) => ({ isFilterPaneVisible: !state.isFilterPaneVisible })),

  sortProducts: async (sort, products) => {
    if (!products) return;

    // const averageProductPrice = (product : Product) => {
    //   const total = sumBy(product.variants, 'amount');

    //   return total / product.reviews.length;
    // };
    

    // const sortedProducts = sortBy(products, [
    //   products => 
    // ]);

    // console.log("SORTED ITEMS", sortedProducts);
  },

  queryProducts: async ({ filter = [], limit, collectionId, page, sort }) => {
    try {
      const request = await fetch(
        `/api/products?query=${JSON.stringify(filter)}&limit=${limit}&page=${page}&collection=${collectionId}&sort=${sort}`
      );

      const { data } = await request.json();

      set({ products: data?.products, productsCount: data?.total });
    } catch (error) {
      console.log(error);
    }
  },
}));
