import type { Metadata } from "next";
import Head from 'next/head';
import { Inter, Geist_Mono } from "next/font/google";
import "../globals.css";
import MilliwaysLayout from "./_components/milliways/layout";
import styles from './page.module.css';
import { classNames } from "../_utility/utilityFuncs";
import AuthProvider from "./wanderer/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderer",
  description: "Create visual travel itineraries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <div className={classNames(styles.appContainer)}>
            <MilliwaysLayout />
            <div className={styles.contentContainer} id='mainContentContainer'>{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
