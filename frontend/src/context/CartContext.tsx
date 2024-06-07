// src/context/CartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface CartContextType {
  cartId: string | null;
  setCartId: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(() => {
    return localStorage.getItem("cartId");
  });

  useEffect(() => {
    const fetchCurrentUser = async (): Promise<{ id: string } | null> => {
      const response = await fetch("/api/me");
      if (response.ok) {
        return response.json();
      }
      return null;
    };

    const createCart = async (
      userID: string
    ): Promise<{ cartID: string } | null> => {
      const response = await fetch("/api/createShoppingCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartID: 1,
          userID: userID,
        }),
      });
      if (response.ok) {
        return response.json();
      }
      return null;
    };

    const initializeCart = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        const newCart = await createCart(user.id);
        if (newCart) {
          setCartId(newCart.cartID);
          localStorage.setItem("cartID", newCart.cartID);
        }
      }
    };

    initializeCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
