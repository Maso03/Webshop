// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css"; // Ensure Tailwind CSS styles are imported
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import User from "./components/User";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import AdminProducts from "./components/AdminPage";
import ShoppingCartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user" element={<User />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
