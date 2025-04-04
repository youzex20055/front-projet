import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = ({ id, name, price, image }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  return (
    <div className="product" style={{ height: '160px' }}>
      <img src={image} alt={name} style={{ height: '250px', objectFit: 'contain' }} />
      <div className="description">
        <p><b>{name}</b></p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>
    </div>
  );
};
