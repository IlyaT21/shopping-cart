import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Fake Store API
    fetch("https://fakestoreapi.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // Set the fetched data to state
        setLoading(false); // Stop the loading spinner
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const shortenDescription = (description, maxLength = 80) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Products</h1>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100px" }}
              />
              <h2>{product.title}</h2>
              <p className="product-desc">
                {shortenDescription(product.description)}
              </p>
							<p>Price: ${product.price}</p>
							<button>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Shop;
