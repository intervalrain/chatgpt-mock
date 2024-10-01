'use client';

import "./styles/globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceProvider";
import { SidebarProvider } from "./context/SidebarContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Router>
        <ServiceProvider>
          <body>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          </body>
        </ServiceProvider>
      </Router>
    </html>
  );
}
