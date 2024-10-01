'use client';

import "./styles/globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Router>
        <AppProvider>
          <body>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          </body>
        </AppProvider>
      </Router>
    </html>
  );
}
