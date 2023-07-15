import "./globals.css";
import { Inter, Jua } from "next/font/google";

import Nav from "../components/nav";
import Footer from "../components/footer";

import { GlobalContextProvider } from "./context/store";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Shop",
  description: "Mock flower shop",
};

const inter = Inter({ subsets: ["latin"] });
export const jua = Jua({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jua",
  display: "swap",
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
        <GlobalContextProvider>
          <Nav />
          {children}
        </GlobalContextProvider>
        <Footer />
      </body>
    </html>
  );
}
