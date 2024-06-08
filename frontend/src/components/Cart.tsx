// CartPage.tsx
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

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/shoppingCart");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched cart data:", data); // Log the response to debug
        setCart(data.carts); // Assuming the response contains carts
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

  const handleRemoveItem = async (cartID: number, productID: number) => {
    try {
      const response = await fetch(`/api/shoppingCart/${productID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // Update the cart state after successful removal
      setCart(
        cart.map((cartItem: CartItem) => {
          if (cartItem.cartID === cartID) {
            return {
              ...cartItem,
              items: cartItem.items.filter(
                (item: Item) => item.productID !== productID
              ),
            };
          }
          return cartItem;
        })
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8 mt-16">
        <h2 className="text-4xl font-bold mb-4">Shopping Cart</h2>
        <div className="max-w-lg w-full">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartID}
              className="bg-white p-4 mb-4 rounded shadow"
            >
              <h3 className="text-lg font-semibold">
                Your cart ID: {cartItem.cartID}
              </h3>
              {cartItem.items.map((item) => (
                <div
                  key={item.productID}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>{item.productName}</div>
                  <div className="text-right">
                    <div>Price: {item.productPrice} €</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                  <button
                    onClick={() =>
                      handleRemoveItem(cartItem.cartID, item.productID)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <div className="font-semibold">Total Price:</div>
                <div>{calculateTotalPrice(cartItem.items)} €</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
