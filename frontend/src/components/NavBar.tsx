import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/products" className="mr-4">
            Products
          </Link>
          <a href="/api/login" className="mr-4">
            Login
          </a>
          <Link to="/contact" className="mr-4">
            Contact
          </Link>
        </div>
        <input
          type="text"
          placeholder="Suchen..."
          className="border rounded p-2"
        />
      </div>
    </nav>
  );
};

export default NavBar;
