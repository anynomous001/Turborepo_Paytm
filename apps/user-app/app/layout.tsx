import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../provider";
import AppbarClient from "./components/AppbarClient"
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={''}>
          <div>
            <AppbarClient />
            {children}
          </div>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
