"use client";
import { useSearchStore } from "@/src/state/store";
import ProductCard from "../ui/cards/ProductCard";
import EmptySearchResults from "./EmptySearchResult";

export default function SerchResults() {
  const store = useSearchStore();

  if (store?.searchItems?.length === 0) {
    return <EmptySearchResults />;
  }

  return (
    <div>
      <div className="layout">
        <div className="mb-8 lg:mb-24">
          <h1 className="text-xl lg:text-[40px] text-center">Search Results</h1>
          <p className="text-sm lg:text-base text-center mt-3 lg:mt-6">
            Showing {store?.searchItems?.length} results found for '
            {store?.searchText}'{" "}
          </p>
        </div>

        <div>
          <ul className="flex flex-row flex-wrap">
            {store?.searchItems?.map((product) => (
              <li key={product.id}>
                <ProductCard {...{ product, showPrice: true }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
