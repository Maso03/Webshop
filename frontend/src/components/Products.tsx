// src/components/Products.tsx
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Products: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Our Products</h2>
        <p className="text-gray-700 mb-8">
          Here are some of our amazing products.
        </p>
        {/* Add your product components or product listings here */}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
