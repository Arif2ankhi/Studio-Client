
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";

  import { ToastContainer} from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace — Book Creative Studios by the Hour",
  description:
    "Discover and book verified photo studios, sound stages, podcast rooms, music suites and art workshops by the hour.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* Applies the persisted theme before hydration to avoid a flash of the wrong theme. */}
        {/* <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("studio-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        /> */}
        <Navbar />
        
        {children}
        <Footer />
             <ToastContainer />
      </body>
    </html>
  );
}
