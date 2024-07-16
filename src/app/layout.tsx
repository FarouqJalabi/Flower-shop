import "./globals.css";
import { Inter, Jua } from "next/font/google";

import Nav from "../components/nav";
import Footer from "../components/footer";

import { NextAuthProvider } from "./contexts/authProvider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Shop",
  description: "A mock flower shop",
  metadataBase: new URL("https://flower-shop-three.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://flower-shop-three.vercel.app/",
    title: "Flower Shop",
    description: "A mock flower shop",
    siteName: "Flower shop",
    // images: [
    //   {
    //     url: "https://example.com/og.png",
    //   },
    // ],
  },

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
      <head>
        <meta
          name="google-site-verification"
          content="ZVGdHmoplW_pBTM-dYjSBsi42jYQ1pnj6pWFqJLlInI"
        />
      </head>
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
