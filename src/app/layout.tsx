import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata: Metadata = {
  title: "Travey",
  description: "Booking easy with Travey",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
