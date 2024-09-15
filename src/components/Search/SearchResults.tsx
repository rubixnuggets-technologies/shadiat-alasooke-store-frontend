import ProductCard from "../ui/cards/ProductCard";
import EmptySearchResults from "./EmptySearchResult";

export default function SerchResults({ data }) {
  if (data?.length === 0) {
    return <EmptySearchResults />;
  }

  return (
    <div>
      <div className="layout">
        <div className="mb-24">
          <h1 className="text-[40px] text-center">Search Results</h1>
          <p className="text-center mt-6">
            Showing {data?.length} results found for 'A'{" "}
          </p>
        </div>

        <div>
          <ul className="grid grid-cols-10">
            {data?.map((product) => (
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
