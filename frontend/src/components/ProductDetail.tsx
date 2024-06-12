import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response to debug
        if (data && data.product) {
          setProduct(data.product); // Extract the first element
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    /*
    TODO: 
    - Bei Login ein Cart für den User erstellen und ID speichern
    - Bei Checkout (Mock Checkout) ein neues Cart erstellen und als aktuelles Cart setzen
    */
    const cartItem = {
      productID: product.productID,
      cartID: Number(localStorage.getItem("cartId")),
      quantity: 1,
    };

    console.log(cartItem);

    try {
      const response = await fetch("http://localhost:5173/api/shoppingCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      console.log(JSON.stringify(cartItem));
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.result);
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
              &#8592; {/* Unicode for left arrow */}
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
                <button
                  onClick={handleAddToCart}
                  className="mt-6 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
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
