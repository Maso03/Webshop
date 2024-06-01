// src/components/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Webshop</h2>
        <p className="text-gray-700 mb-8">
          Discover the best products at amazing prices.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Shop Now
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
