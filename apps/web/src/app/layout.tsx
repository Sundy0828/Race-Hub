import Head from "next/head";

import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Providers from "./providers";
import NavBar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Race Hub",
  description: "Race result hub for any and all races.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable} ${robotoMono.variable}`}>
        <Providers>
          <div className="layout-root">
            <NavBar />
            <main className="layout-main">
              <div className="container">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
