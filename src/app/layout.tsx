import type { Metadata } from "next";
import { Marmelad } from "next/font/google";
import { RootStyleRegistry } from "./root-style-registry";

export const marmelad = Marmelad({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
  icons: "/cronograma.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head />
      <body className={marmelad.className}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
