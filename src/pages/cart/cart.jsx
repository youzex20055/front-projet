import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useGetProductsQuery, useGetProshirtsQuery, useGetProaccQuery } from "../../services/productService";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import "./cart.css";

const stripePromise = loadStripe('pk_test_51R5YEbKDHCQIAKtkEcLkVBEtuzGLDhtrSIUClO36T3jzkUG5s0ytydpY9nq5JaCRArHSqbB9URlW3pMGTK39YkZk00zhm77sxA');

export const Cart = () => {
  const { cartItems } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  
  const handlePaymentClick = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      navigate("/payment", { 
        state: { 
          items: allProducts
            .filter(product => cartItems[product.id] > 0)
            .map(product => ({
              id: product.id,
              name: product.productName,
              price: product.price,
              quantity: cartItems[product.id]
            })),
          total: subtotal
        }
      });
    } else {
      navigate("/signin", { state: { redirectTo: "/payment" } });
    }
  };

  const { data: products } = useGetProductsQuery();
  const { data: shirts } = useGetProshirtsQuery();
  const { data: accessories } = useGetProaccQuery();

  useEffect(() => {
    const productsData = products?.data || [];
    const shirtsData = shirts?.data || [];
    const accessoriesData = accessories?.data || [];
    
    setAllProducts([...productsData, ...shirtsData, ...accessoriesData]);
  }, [products, shirts, accessories]);

  const subtotal = allProducts.reduce((acc, product) => {
    if (cartItems[product.id] > 0) {
      return acc + product.price * cartItems[product.id];
    }
    return acc;
  }, 0);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {allProducts.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <CartItem
                key={product.id}
                id={product.id}
                name={product.productName}
                price={product.price}
                image={product.productImage?.[0]?.url 
                  ? `http://localhost:1337${product.productImage[0].url}`
                  : `/assets/products/${product.id}.jpg`}
              />
            );
          }
          return null;
        })}
      </div>
      {subtotal > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <div>
            <button onClick={() => navigate("/shop")}>Continue Shopping</button>
            <button onClick={() => navigate("/payment")}>Checkout</button>
          </div>
        </div>
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </div>
  );
};

