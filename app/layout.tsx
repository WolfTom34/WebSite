import localFont from "next/font/local";
import "./globals.css";

const AldotheApache = localFont({
  src: [
    {
      path: "./fonts/AldotheApache.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-AldotheApache",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={AldotheApache.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}