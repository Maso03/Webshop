import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AdminPage: React.FC = () => {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/orders");
        const data = await response.json();
        if (response.ok) {
          setRecentOrders(data.orders);
        } else {
          console.error("Error fetching orders:", data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (recentOrders.length > 0) {
      const lastTenDays = Array.from({ length: 10 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      const orderSums = lastTenDays.map((date) => {
        return {
          date,
          total: recentOrders
            .filter((order) => order.orderDate.startsWith(date))
            .reduce((sum, order) => sum + order.totalPrice, 0),
        };
      });

      setChartData(orderSums);
    }
  }, [recentOrders]);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Admin Page</h2>
        <div className="flex space-x-4 mb-8">
          <Link
            to="/admin/users"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Admin Users
          </Link>
          <Link
            to="/admin/products"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Admin Products
          </Link>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-3/4 p-4">
            <h3 className="text-2xl font-bold mb-4">
              Sales Graph: Last 10 Days
            </h3>
            <div className="bg-white p-4 rounded shadow">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="md:w-1/4 p-4">
            <h3 className="text-2xl font-bold mb-4">Recent Orders</h3>
            <div className="bg-white p-4 rounded shadow h-64 overflow-y-auto">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {recentOrders.map((order) => (
                    <li key={order.ordersID} className="mb-2">
                      <div className="text-gray-700 font-bold">
                        {order.userID}
                      </div>
                      <div className="text-gray-600">
                        {order.totalPrice}€ -{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600">
                        {order.products.map((product: any, index: any) => (
                          <div key={index}>
                            {product.name} - {product.amount} pcs
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
