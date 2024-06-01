// src/components/User.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const User: React.FC = () => {
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<string | null>(null);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePurchaseClick = (purchase: string) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto p-4 bg-white shadow-md mt-4 w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Past Purchases</h3>
          <ul className="list-disc list-inside">
            <li
              onClick={() => handlePurchaseClick("Product A - $99.99")}
              className="cursor-pointer"
            >
              Purchase 1: Product A - $99.99
            </li>
            <li
              onClick={() => handlePurchaseClick("Product B - $149.99")}
              className="cursor-pointer"
            >
              Purchase 2: Product B - $149.99
            </li>
            <li
              onClick={() => handlePurchaseClick("Product C - $199.99")}
              className="cursor-pointer"
            >
              Purchase 3: Product C - $199.99
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Data</h3>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="name"
                value={shippingData.name}
                onChange={handleEditChange}
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleEditChange}
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleEditChange}
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="tel"
                name="phone"
                value={shippingData.phone}
                onChange={handleEditChange}
                className="border rounded p-2 w-full mb-2"
              />
              <button
                onClick={handleEditToggle}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>Name: {shippingData.name}</p>
              <p>Address: {shippingData.address}</p>
              <p>Email: {shippingData.email}</p>
              <p>Phone: {shippingData.phone}</p>
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          )}
        </section>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Purchase Details</h3>
            <p>{selectedPurchase}</p>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
