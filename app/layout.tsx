"use client";

import "./styles/globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import DialogManager from "./components/layout/DialogManager";
import { useAuth } from "./context/AuthContext";

const RootContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="flex w-screen h-screen items-center justify-center text-3xl text-red-600">You are not authorized to access service.</div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col h-screen">
          <Header />
          {children}
          <Footer />
        </div>
        <DialogManager />
      </main>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Router>
          <ServiceProvider>
            <RootContent>{children}</RootContent>
          </ServiceProvider>
        </Router>
      </body>
    </html>
  );
}
