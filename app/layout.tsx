"use client";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import MedusaApp from "@/src/MedusaApp";
import LazyLoader from "@/src/framer/LazyLoader";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCustomerStore } from "@/src/state/customer";
import { useCartStore } from "@/src/state/cart";

const font = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const { customer, setCustomer } = useCustomerStore();
  const { setCart } = useCartStore();

  useEffect(() => {
    if (!customer) {
      setCustomer();
    }

    if (customer?.metadata?.cartId) {
      setCart({ cart_id: customer?.metadata?.cartId });
    }
  }, [path, customer]);

  return (
    <html lang="en">
      {/* <body className={classNames( playfair.className, roboto_mono.className )}> */}
      <body className={font.className}>
        {/* <UserProvider> */}
        <MedusaApp>
          <LazyLoader>{children}</LazyLoader>
        </MedusaApp>
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
