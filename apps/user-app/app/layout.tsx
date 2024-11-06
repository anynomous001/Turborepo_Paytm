import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import AppbarClient from "./components/AppbarClient"
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "PlayTM",
  description: "A replica of paytm application.",
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
