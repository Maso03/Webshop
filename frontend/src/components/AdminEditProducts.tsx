import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const EditProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(
        `/api/products/${updatedProduct.productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availability: Number(updatedProduct.availability),
            id: updatedProduct.productID,
            description: updatedProduct.description,
            price: String(updatedProduct.price),
            categoryID: updatedProduct.categoryID,
            productName: updatedProduct.productName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const responseBody = await response.json();
      const productID = responseBody.product[0].productID;
      console.log("Product ID:", productID);

      setProducts(
        products.map((product) =>
          product.productID === updatedProduct.productID
            ? updatedProduct
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productID: number
  ) => {
    const { name, value } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === productID
          ? { ...product, [name]: value }
          : product
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4">Edit Products</h2>
        <button
          onClick={() => navigate("/admin/products")}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 mb-4"
        >
          Back to Admin Products
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-4xl overflow-y-auto max-h-96 mb-8">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Availability</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productID}>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="productName"
                          value={product.productName}
                          onChange={(e) => handleChange(e, product.productID)}
                          className="py-2 px-4 border rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="description"
                          value={product.description}
                          onChange={(e) => handleChange(e, product.productID)}
                          className="py-2 px-4 border rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="price"
                          value={product.price}
                          onChange={(e) => handleChange(e, product.productID)}
                          className="py-2 px-4 border rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="number"
                          name="availability"
                          value={product.availability}
                          onChange={(e) => handleChange(e, product.productID)}
                          className="py-2 px-4 border rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleUpdateProduct(product)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditProducts;
