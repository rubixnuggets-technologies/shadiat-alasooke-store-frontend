import { create } from "zustand";

export interface IProductState {
  isFilterPaneVisible: boolean;

  toggleFilterPane: () => void;
}

const initialState: Pick<IProductState, "isFilterPaneVisible"> = {
  isFilterPaneVisible: true,
};

export const useProductStore = create<IProductState>((set) => ({
  ...initialState,

  toggleFilterPane: () =>
    set((state) => ({ isFilterPaneVisible: !state.isFilterPaneVisible })),
}));
