import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export default function MedusaApp({ children }: { children: React.ReactNode }) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_ENDPOINT || ""}
    >
      <div>{children}</div>
    </MedusaProvider>
  );
}
