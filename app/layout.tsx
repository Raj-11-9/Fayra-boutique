import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fayra Boutique — Indian Occasionwear, Chosen for You",
  description: "Shop a considered selection of Indian occasionwear, sarees, festive sets, and everyday favourites at Fayra Boutique.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
