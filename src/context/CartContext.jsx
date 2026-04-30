import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cartContext";
const STORAGE_KEY = "solex-cart";
const WISHLIST_STORAGE_KEY = "solex-wishlist";

const readInitialCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const readInitialWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readInitialCart);
  const [wishlistItems, setWishlistItems] = useState(readInitialWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.name === product.name);
      if (existing) {
        return current.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const updateQuantity = (productName, quantity) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.name === productName ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productName) => {
    setCartItems((current) => current.filter((item) => item.name !== productName));
  };

  const clearCart = () => setCartItems([]);

  const addToWishlist = (product) => {
    setWishlistItems((current) => {
      if (current.some((item) => item.name === product.name)) return current;
      return [...current, product];
    });
  };

  const removeFromWishlist = (productName) => {
    setWishlistItems((current) => current.filter((item) => item.name !== productName));
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.priceValue * item.quantity,
      0
    );
    const shipping = subtotal > 0 ? 1200 : 0;
    const total = subtotal + shipping;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, shipping, total, itemCount };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        ...totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
