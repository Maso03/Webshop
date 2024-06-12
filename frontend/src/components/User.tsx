import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Order {
  ordersID: number;
  userID: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  totalPrice: number;
  orderDate: string;
  products: { name: string; price: number; amount: number }[];
}

const User: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePurchaseClick = (order: Order) => {
    setSelectedPurchase(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <div className="w-full pt-16">
        <main className="container mx-auto p-4 bg-white shadow-lg mt-4 w-full lg:w-2/3 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            User Profile
          </h2>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Past Purchases
            </h3>
            <ul className="list-disc list-inside">
              {orders.map((order) => (
                <li
                  key={order.ordersID}
                  onClick={() => handlePurchaseClick(order)}
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  Order {order.ordersID}: Total - ${order.totalPrice.toFixed(2)}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer />

      {isModalOpen && selectedPurchase && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Purchase Details
            </h3>
            <p className="text-gray-700">
              Order ID: {selectedPurchase.ordersID}
            </p>
            <p className="text-gray-700">
              Shipping Address: {selectedPurchase.shippingAddress},{" "}
              {selectedPurchase.city}, {selectedPurchase.postalCode},{" "}
              {selectedPurchase.country}
            </p>
            <p className="text-gray-700">
              Order Date:{" "}
              {new Date(selectedPurchase.orderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              Total Price: ${selectedPurchase.totalPrice.toFixed(2)}
            </p>
            <h4 className="font-semibold mt-4 text-gray-800">Products:</h4>
            <ul className="list-disc list-inside">
              {selectedPurchase.products.map((product, index) => (
                <li key={index} className="text-gray-700">
                  {product.name}: ${product.price.toFixed(2)} x {product.amount}
                </li>
              ))}
            </ul>
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
