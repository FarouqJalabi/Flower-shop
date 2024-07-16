import "./globals.css";
import { Inter, Jua } from "next/font/google";

import Nav from "../components/nav";
import Footer from "../components/footer";

import { NextAuthProvider } from "./contexts/authProvider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Shop",
  description: "Mock flower shop",
  other: {
    "google-site-verification": "ZVGdHmoplW_pBTM-dYjSBsi42jYQ1pnj6pWFqJLlInI",
  },
};

const inter = Inter({ subsets: ["latin"] });
const jua = Jua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jua",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*! ERROR comes from this  */}
      <body className={`${inter.className} ${jua.variable} overflow-x-hidden`}>
        <NextAuthProvider>
          <Nav />
          {children}
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
