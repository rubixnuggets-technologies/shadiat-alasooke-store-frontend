import type { Metadata } from "next";
import { Inter, Playfair, Playfair_Display } from "next/font/google";
import "./globals.css";
import MedusaApp from "@/src/MedusaApp";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import classNames from "classnames";
import {  playfair, roboto_mono } from "./font"

export const metadata: Metadata = {
  title: "Alasooke",
  description: "Store by Alasooke",
};

const font = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={classNames( playfair.className, roboto_mono.className )}> */}
      <body className={font.className}>
        <UserProvider>
          <MedusaApp>{children}</MedusaApp>
        </UserProvider>
      </body>
    </html>
  );
}
