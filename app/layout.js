import { Outfit, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { OshenProvider } from "@/lib/store";
import Nav from "@/components/Nav";
import ToastHost from "@/components/ToastHost";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "OSHEN — Africa's Community Investment Platform",
  description:
    "Invest in vetted African builders from ₦50,000. Funds release in phases you can vote on, not all at once.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body className="font-body">
        <OshenProvider>
          <Nav />
          {children}
          <ToastHost />
        </OshenProvider>
      </body>
    </html>
  );
}
