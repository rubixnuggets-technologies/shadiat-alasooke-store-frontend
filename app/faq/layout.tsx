"use client";

import { useSearchStore } from "@/src/state/search";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { searchItems, isOpen } = useSearchStore();
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen && pathname !== "/faq") {
      useSearchStore.setState({ isOpen: false })
    }
  }, [pathname])

  return (
    <div>
      <Header />

      {searchItems && isOpen ? (
        <SearchResultsView />
      ) : (
        <div>{children}</div>
      )}

      <Footer />
    </div>
  );
}
