import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Product {
  productID: number;
  productName: string;
  description?: string;
  price: string;
  categoryID: number;
  availability: number;
  image?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/me");
        if (!response.ok) {
          if (response.status === 401) {
            setIsAuthenticated(false);
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    const cartItem = {
      productID: product.productID,
      cartID: Number(localStorage.getItem("cartId")),
      quantity: 1,
    };

    const quantityInput = prompt("Enter quantity:");
    if (!quantityInput || isNaN(Number(quantityInput))) {
      alert("Invalid quantity. Please enter a number.");
      return;
    }

    const quantity = Number(quantityInput);
    if (quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    cartItem.quantity = quantity;

    try {
      await fetch(`http://localhost:5173/api/products/${product.productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availability: product.availability - quantity,
          id: product.productID,
          description: product.description,
          price: String(product.price),
          categoryID: product.categoryID,
          productName: product.productName,
        }),
      });

      const response = await fetch("http://localhost:5173/api/shoppingCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.result);

      navigate("/products");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="relative bg-white p-8 rounded shadow-lg w-full max-w-2xl text-center">
            <a
              href="/products"
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              aria-label="Back to products"
              style={{ fontSize: "2rem" }}
            >
              &#8592;
            </a>
            <div className="flex flex-col md:flex-row justify-center items-center">
              {product.image && (
                <div className="md:mr-8 mb-4 md:mb-0 max-w-full md:max-w-xs">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
              <div className="text-left">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-green-500 font-bold text-2xl mb-4">
                  {product.price} €
                </p>
                <p className="text-gray-500 mb-4">
                  Availability: {product.availability}
                </p>
                {!isAuthenticated && (
                  <p className="text-red-500 mb-4">Login to add product</p>
                )}
                <button
                  onClick={handleAddToCart}
                  className={`mt-6 px-4 py-2 font-bold rounded ${
                    isAuthenticated
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!isAuthenticated}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
