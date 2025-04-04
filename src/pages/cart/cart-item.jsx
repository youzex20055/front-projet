import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  const getImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith('http')) {
      return imageUrl;
    }
    return `/assets/products/${id}.jpg`;
  };

  return (
    <div className="cartItem">
      <img src={getImageUrl(image)} alt={name} />
      <div className="description">
        <p><b>{name}</b></p>
        <p>Price: ${price?.toFixed(2) || '0.00'}</p>
        <div className="countHandler">
          <button 
            onClick={() => removeFromCart(id)}
            className="quantity-btn"
          > 
            - 
          </button>
          <input
            type="number"
            min="0"
            value={cartItems[id] || 0}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            className="quantity-input"
          />
          <button 
            onClick={() => addToCart(id)}
            className="quantity-btn"
          > 
            + 
          </button>
        </div>
      </div>
    </div>
  );
};
