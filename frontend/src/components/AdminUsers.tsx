import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          setError(data.error || "Failed to fetch users");
        }
      } catch (error) {
        setError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/deleteuser/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user:", data.error);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Admin Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="w-full bg-white p-4 rounded shadow">
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <div className="text-gray-700 font-bold">{user.name}</div>
                    <div className="text-gray-600">{user.email}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          to="/admin"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back to Admin Page
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default AdminUserPage;
