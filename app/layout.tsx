import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aavya Boutique — Indian Occasionwear, Chosen for You",
  description: "Shop a considered selection of Indian occasionwear, sarees, festive sets, and everyday favourites at Aavya Boutique.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
