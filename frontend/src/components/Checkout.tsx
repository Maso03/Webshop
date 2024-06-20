// CheckoutPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Item = {
  productID: number;
  productPrice: number;
  productName: string;
  quantity: number;
};

type CartItem = {
  cartID: number;
  items: Item[];
};

const CheckoutPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/shoppingCart");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched cart data:", data);
        setCart(data.carts);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const calculateTotalPrice = (items: Item[]) => {
    let total = 0;
    items.forEach((item) => {
      total += item.productPrice * item.quantity;
    });
    return total;
  };

  const validateForm = () => {
    return Object.values(address).every((field) => field.trim() !== "");
  };

  const handlePayWithPayPal = async () => {
    if (validateForm()) {
      try {
        // Step 1: Create Shipping Address
        const shippingAddressResponse = await fetch(
          "/api/createShippingAddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: localStorage.getItem("userID"),
              address: address.address,
              city: address.city,
              postalCode: address.postalCode,
              country: address.country,
            }),
          }
        );

        if (!shippingAddressResponse.ok) {
          throw new Error(
            `Error creating shipping address: ${shippingAddressResponse.statusText}`
          );
        }
        const result = await shippingAddressResponse.json();
        const shippingAddressID = result.result[0].addressID;

        console.log(shippingAddressID);

        // Step 2: Checkout with Shipping Address ID
        const checkoutResponse = await fetch("/api/orders/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressID: shippingAddressID,
            cartID: cart[0].cartID, // Assuming only one cart item for simplicity
          }),
        });

        if (!checkoutResponse.ok) {
          throw new Error(
            `Error processing order: ${checkoutResponse.statusText}`
          );
        }

        alert("Order processed successfully");
        navigate("/");
      } catch (error) {
        console.error("Error processing order:", error);
        alert("Oopsie Woopsie! Something went wrong. Please try again.");
      }
    } else {
      alert("Oopsie Woopsie! Please fill out all fields.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Checkout</h2>
        <div className="flex flex-col lg:flex-row lg:space-x-8 w-full max-w-4xl">
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg mb-6 lg:mb-0">
            {cart.map((cartItem) => (
              <div key={cartItem.cartID} className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Your cart ID: {cartItem.cartID}
                </h3>
                {cartItem.items.map((item) => (
                  <div
                    key={item.productID}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="text-gray-800">{item.productName}</div>
                    <div className="text-right">
                      <div className="text-gray-700">
                        Price: {item.productPrice} €
                      </div>
                      <div className="text-gray-700">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <div className="font-semibold text-gray-800">
                    Total Price:
                  </div>
                  <div className="text-gray-700">
                    {calculateTotalPrice(cartItem.items)} €
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Shipping Information
            </h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </form>
          </div>
        </div>
        <button
          onClick={handlePayWithPayPal}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Pay with PayPal
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
