import { Inter, Playfair, Playfair_Display, Roboto_Mono, Roboto_Serif, Open_Sans } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const roboto_mono = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
