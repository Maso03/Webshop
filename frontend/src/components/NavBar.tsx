import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<null | { name: string }>(null);
  const navigate = useNavigate();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="bg-gray-700 shadow-md py-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <img src="/logo.png" alt="Home" className="w-13 h-12" />
          </Link>
          <Link to="/products" className="mr-4 text-white">
            Products
          </Link>
          <Link to="/contact" className="mr-4 text-white">
            Contact
          </Link>
          <Link to="/admin" className="mr-4 text-white">
            Admin
          </Link>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-center">
            {!user && (
              <a
                href="/api/login"
                className="mr-4 ml-4 text-gray-300 border border-gray-300 rounded-full px-4 py-2"
              >
                Login
              </a>
            )}
            {user && (
              <a
                href="/api/logout"
                className="mr-4 ml-4 text-gray-300 border border-gray-300 rounded-full px-4 py-2"
              >
                Logout
              </a>
            )}
            {user && (
              <Link to="/cart" className="mr-4 text-white">
                <img src="/cart.svg" alt="User Page" className="w-10 h-10" />
              </Link>
            )}
            {user && (
              <Link to="/user" className="mr-4 text-white">
                <img src="/user.svg" alt="User Page" className="w-10 h-10" />
              </Link>
            )}
            {user && (
              <span className="ml-2 text-white">Hello, {user.name}!</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
