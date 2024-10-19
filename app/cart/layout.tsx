"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerStore } from "@/src/state/customer";

import { useSearchStore } from "@/src/state/search";
import SearchResultsView from "@/src/components/Search/SearchResults";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function Layout({ children }) {
  const store = useSearchStore();
  const { customer, setCustomer } = useCustomerStore();
  const router = useRouter();

  // useEffect(() => {
  //   setCustomer();
  // }, []);

  if (!customer) {
    router.push("/customer/login");
    return;
  }

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
