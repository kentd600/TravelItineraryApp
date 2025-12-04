import type { Metadata } from "next";
import { Inter, Geist_Mono, Londrina_Solid } from "next/font/google";
import "../globals.css";
import MilliwaysLayout from "./_components/milliways/layout";
import styles from './page.module.css';
import { classNames } from "../_utility/utilityFuncs";
import AuthProvider from "./wanderer/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin']
});

const londrina = Londrina_Solid({
  variable: "--font-londrina-s",
  weight: "400"
})

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
      <body className={`${inter.variable} ${geistMono.variable} ${londrina.variable}`}>
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
