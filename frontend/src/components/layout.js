import React from "react";
import "../styles/globals.css"; // Global CSS styles
import Header from "./Header.tsx"; // Header component
import Footer from "./Footer.tsx"; // Footer component
import { Helmet } from "react-helmet"; // For managing metadata

export default function RootLayout({ children }) {
  return (
    <>
      {/* Metadata for the app */}
      <Helmet>
        <title>School Competition App</title>
        <meta name="description" content="A quiz app for school competitions" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
