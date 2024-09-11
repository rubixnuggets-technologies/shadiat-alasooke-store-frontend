import type { Metadata } from "next";
import { Inter, Playfair, Playfair_Display } from "next/font/google";
import "./globals.css";
import MedusaApp from "@/src/MedusaApp";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={font.className}>
        <MedusaApp>{children}</MedusaApp>
      </body>
    </html>
  );
}
