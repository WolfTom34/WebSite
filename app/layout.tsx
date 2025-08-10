import localFont from "next/font/local";
import "./globals.css";

const AldotheApache = localFont({
  src: [
    {
      path: "./fonts/AldotheApache.ttf", // chemin relatif
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-AldotheApache",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={AldotheApache.className}>
      <body>{children}</body>
    </html>
  );
}
