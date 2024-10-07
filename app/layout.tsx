'use client';

import "./styles/globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceProvider";
import { SidebarProvider } from "./context/SidebarContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


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
              <main className="flex-1 overflow-hidden">
                <div className="flex flex-col h-screen">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </main>
            </div>
          </body>
        </ServiceProvider>
      </Router>
    </html>
  );
}
