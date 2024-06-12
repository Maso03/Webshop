import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Product {
  productID: number;
  productName: string;
  description?: string;
  price: string;
  categoryID: number;
  availability: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        let filteredProducts = data.products;
        if (searchTerm) {
          filteredProducts = data.products.filter((product: Product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const sortByAlphabet = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    setProducts(sortedProducts);
  };

  const sortByPrice = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setProducts(sortedProducts);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-4xl font-bold text-gray-800">Our Products</h2>
          <div className="flex space-x-4">
            <button
              onClick={sortByAlphabet}
              className="text-blue-500 hover:underline"
            >
              Sort by Alphabet
            </button>
            <button
              onClick={sortByPrice}
              className="text-blue-500 hover:underline"
            >
              Sort by Price
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-8">
          Here are some of our amazing products.
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) =>
              product.availability > 0 ? (
                <Link
                  key={product.productID}
                  to={`/product/${product.productID}`}
                  className="bg-white p-4 rounded shadow-md hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-green-500 font-bold">{product.price}€</p>
                  <p className="text-gray-500">
                    Availability: {product.availability}
                  </p>
                </Link>
              ) : (
                <div
                  key={product.productID}
                  className="bg-white p-4 rounded shadow-md relative"
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-green-500 font-bold">{product.price}€</p>
                  <p className="text-gray-500">
                    Availability: {product.availability}
                  </p>
                  <div className="absolute inset-0 bg-red-600 bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      OUT OF STOCK
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
