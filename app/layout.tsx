import type { Metadata } from "next";
import "./globals.scss";
import localFont from "next/font/local";
// import { LicenseManager } from "ag-grid-enterprise";
import NProgressBar from "@/app/components/NProgress";

export const metadata: Metadata = {
  title: "DIFC",
  description: "DIFC",
};

const lufga = localFont({
  src: [
    {
      path: "../public/assets/fonts/LufgaLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/LufgaRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/LufgaMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/LufgaSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/LufgaBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

// LicenseManager.setLicenseKey(process.env.LICENSE_KEY_AG);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lufga.className}>
        <NProgressBar />
        {children}
      </body>
    </html>
  );
}
