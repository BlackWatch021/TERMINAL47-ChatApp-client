import type { Metadata } from "next";
import { Inconsolata, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const jetBrains=JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

const inconsolata=Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "Talk Anonymously",
  description: "Chat with other agents anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetBrains.variable} ${inconsolata.variable} font-ui text-terminalGreen`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
