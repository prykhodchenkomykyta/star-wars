import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Star Wars App",
    template: "%s | Next.js 14",
  },
  description: "Star Wars Hero Details App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-gray-900`}
      >
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center w-full px-4">
          <div className="w-full max-w-[90vw] mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
