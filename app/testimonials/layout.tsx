"use client";

import { useSearchStore } from "@/src/state/search";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function Layout({ children }) {
  const store = useSearchStore();

  return (
    <div>
      <Header />

      {store?.searchItems && store?.isOpen ? (
        <SearchResultsView />
      ) : (
        <div>{children}</div>
      )}

      <Footer />
    </div>
  );
}
