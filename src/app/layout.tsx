import type { Metadata } from "next";
import { Marmelad, Roboto } from "next/font/google";
import AuthProvider from "./components/authProvider";
import { RootStyleRegistry } from "./root-style-registry";
import "./styles.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const marmelad = Marmelad({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reserva.me",
  description: "Reserva.me",
  icons: "/cronograma.png",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <head />
      <body className={`${marmelad.className} ${roboto.className} `}>
        <AuthProvider>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
