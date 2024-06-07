// src/components/LandingPage.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/me");

      if (response.status === 401) {
        localStorage.setItem("userID", "0");
        return;
      }

      const data = await response.json();
      console.log(data);
      const user = data.user;
      localStorage.setItem("userID", user.id);
    };
    getUser();
  });
  useEffect(() => {
    const getCurrentCarts = async () => {
      const response = await fetch("api/shoppingCart");
      if (response.status === 401) {
        localStorage.setItem("cartId", "0");
      }
      const data = await response.json();
      const carts = data.carts;
      console.log("Current shopping cart: ", carts[0].cartID);
      localStorage.setItem("cartId", carts[0].cartID);
    };
    getCurrentCarts();
  });
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem("cartId");
      console.log(localStorage);
      if (!cartId || cartId === "0") {
        const cart = {
          cartID: 1,
          userID: localStorage.getItem("userID"),
        };
        if (localStorage.getItem("userID")) {
          const response = await fetch("/api/createShoppingCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
          });
          if (response.ok) {
            const result = await response.json();
            localStorage.setItem("cartId", result.result[0].cartID);
          }
        }
      }
    };
    initializeCart();
  });

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
