import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./../components/Gallery/gallery.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Website",
  description: "Want to find your dreamy holidays? You are in the right place!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <body>
        <div className="flexCenter flex-col h-full">
          <Navbar />
          <main className="overflow-x-hidden w-[100vw] lg:w-full h-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
