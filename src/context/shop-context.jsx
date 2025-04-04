import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[productId]) {
        newItems[productId] += 1;
      } else {
        newItems[productId] = 1;
      }
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[productId] && newItems[productId] > 0) {
        newItems[productId] -= 1;
      }
      return newItems;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const checkout = () => {
    setCartItems({});
  };

  return (
    <ShopContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalCartAmount, checkout }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

