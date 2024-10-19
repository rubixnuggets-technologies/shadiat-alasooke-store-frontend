"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCustomerStore } from "@/src/state/customer";

import { useSearchStore } from "@/src/state/search";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function Layout({ children } : { children: ReactNode }) {
  const { isOpen, searchItems } = useSearchStore();
  const { customer } = useCustomerStore();
  const router = useRouter();

  if (!customer) {
    router.push("/customer/login");
    return;
  }

  return (
    <div>
      <Header />

      {searchItems && isOpen ? <SearchResultsView /> : <div>{children}</div>}

      <Footer />
    </div>
  );
}
