import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../services/productService";
import { useGetProshirtsQuery } from "../../services/productService";
import { useGetProaccQuery } from "../../services/productService";
import { Product } from "../shop/product";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  
  const { data: products } = useGetProductsQuery();
  const { data: shirts } = useGetProshirtsQuery();
  const { data: accessories } = useGetProaccQuery();

  useEffect(() => {
    const productsData = products?.data || [];
    const shirtsData = shirts?.data || [];
    const accessoriesData = accessories?.data || [];
    
    setAllProducts([...productsData, ...shirtsData, ...accessoriesData]);
  }, [products, shirts, accessories]);

  const getImageUrl = (product) => {
    if (product?.productImage?.length > 0) {
      return `http://localhost:1337${product.productImage[0].url}`;
    }
    return `/assets/products/${product.id}.jpg`;
  };

  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="search-input-container"></div>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            
          />
          <div className="search-trace"></div>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.productName}
              price={product.price}
              image={getImageUrl(product)}
            />
          ))
        ) : (
          <div className="no-results">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Search;

