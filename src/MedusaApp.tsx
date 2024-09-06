import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export default function MedusaApp({ children }: { children: React.ReactNode }) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
    >
      <div>{children}</div>
    </MedusaProvider>
  );
}
