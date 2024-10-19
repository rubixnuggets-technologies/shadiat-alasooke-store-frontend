"use client";

import { useSearchStore } from "@/src/state/search";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { searchItems, isOpen } = useSearchStore();

  return (
    <div>
      <Header />

      {searchItems && isOpen ? <SearchResultsView /> : <div>{children}</div>}

      <Footer />
    </div>
  );
}
