import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Fake Store API
    fetch("https://fakestoreapi.com/products?limit=3")
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
      <h2 className="shop">Featured Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} id={product.id}>
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
            <Link to="shop">Shop</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Featured;
