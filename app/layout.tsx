import type { Metadata } from "next";
import "./styles/globals.css";
import Sidebar from "./components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "A ChatGPT clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
