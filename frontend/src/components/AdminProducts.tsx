import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    productName: "",
    description: "",
    price: "",
    categoryID: 1,
    availability: 0,
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleAddProduct = async () => {
    try {
      if (imageFile) {
        const base64Image = await convertToBase64(imageFile);
        newProduct.image = base64Image.split(",")[1]; // Remove the data URL prefix
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts([...products, data.result[0]]);
      setNewProduct({
        productName: "",
        description: "",
        price: "",
        categoryID: 1,
        availability: 0,
        image: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleRemoveProduct = async (productID: number) => {
    try {
      const response = await fetch(`/api/products/${productID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setProducts(
        products.filter((product) => product.productID !== productID)
      );
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Ensure it's read as data URL
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4">Admin - Manage Products</h2>
        <Link
          to="/admin/products/edit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 mb-4"
        >
          Edit Products
        </Link>
        <Link
          to="/admin"
          className="px-4 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-600 mb-4"
        >
          Back to Admin
        </Link>
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
                        {product.productName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {product.description}
                      </td>
                      <td className="py-2 px-4 border-b">{product.price}€</td>
                      <td className="py-2 px-4 border-b">
                        {product.availability}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleRemoveProduct(product.productID)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full max-w-4xl bg-white p-4 rounded shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Add New Product</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.productName}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      productName: e.target.value,
                    })
                  }
                  className="py-2 px-4 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="py-2 px-4 border rounded"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="py-2 px-4 border rounded"
                />
                <input
                  type="number"
                  placeholder="Availability"
                  value={newProduct.availability}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      availability: parseInt(e.target.value),
                    })
                  }
                  className="py-2 px-4 border rounded"
                />
                <input
                  type="number"
                  placeholder="Category ID"
                  value={newProduct.categoryID}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      categoryID: parseInt(e.target.value),
                    })
                  }
                  className="py-2 px-4 border rounded"
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="py-2 px-4 border rounded"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
              >
                Add Product
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProducts;
