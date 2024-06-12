import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isCartsLoaded, setIsCartsLoaded] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/me");

      if (response.status === 401) {
        localStorage.setItem("userID", "0");
        setIsUserLoaded(true);
        return;
      }

      const data = await response.json();
      console.log("User gotten");
      const user = data.user;
      localStorage.setItem("userID", user.id);
      setIsUserLoaded(true);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getCurrentCarts = async () => {
      if (!isUserLoaded) return;

      const response = await fetch("api/shoppingCart");
      if (response.status === 401) {
        localStorage.setItem("cartId", "0");
      }
      const data = await response.json();
      const carts = data.carts;
      console.log("Current carts checked");
      const cartId = carts[0] ? carts[0].cartID : 0;
      console.log("Current shopping cart: ", cartId);
      localStorage.setItem("cartId", cartId.toString());
      setIsCartsLoaded(true);
    };

    getCurrentCarts();
  }, [isUserLoaded]);

  useEffect(() => {
    const initializeCart = async () => {
      if (!isCartsLoaded) return;

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
            console.log("New Shopping cart created", result.result[0].cartID);
            localStorage.setItem("cartId", result.result[0].cartID.toString());
          }
        }
      }
    };

    initializeCart();
  }, [isCartsLoaded]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        // Filter out products with 0 stock
        const filteredProducts = data.products.filter(
          (product: any) => product.availability > 0
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getLowStockProducts = (count: number) => {
    const sortedProducts = [...products].sort(
      (a, b) => a.availability - b.availability
    );
    // Filter out products with higher stock
    const lowStockProducts = sortedProducts.filter(
      (product, index) => index < count
    );
    return lowStockProducts;
  };

  const renderLowStockProducts = () => {
    const lowStockProducts = getLowStockProducts(5);
    return lowStockProducts.map((product) => (
      <Link key={product.productID} to={`/product/${product.productID}`}>
        <div className="bg-gray-100 p-4 mr-4 rounded w-64 h-40">
          <h3 className="text-xl font-bold text-gray-800">
            {product.productName}
          </h3>
          <p className="text-gray-700">Availability: {product.availability}</p>
          {product.availability <= 5 && (
            <p className="text-red-700 font-bold">Soon Out of Stock</p>
          )}
        </div>
      </Link>
    ));
  };

  const renderTopPicks = () => {
    const topPicks = shuffleArray([...products]).slice(0, 5);
    return topPicks.map((product) => (
      <Link key={product.productID} to={`/product/${product.productID}`}>
        <div className="bg-gray-100 p-4 mr-4 rounded w-64 h-40">
          <h3 className="text-xl font-bold text-gray-800">
            {product.productName}
          </h3>
          <p className="text-green-700">Today for {product.price}€!</p>
        </div>
      </Link>
    ));
  };

  // Function to shuffle array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Our Webshop
        </h2>
        <p className="text-gray-600 mb-8">
          Discover the best products at amazing prices.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Shop Now
        </Link>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Soon Out of Stock!</h3>
          <div className="flex overflow-x-auto">
            {loading ? <p>Loading...</p> : renderLowStockProducts()}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Top Picks for You</h3>
          <div className="flex overflow-x-auto">
            {loading ? <p>Loading...</p> : renderTopPicks()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
