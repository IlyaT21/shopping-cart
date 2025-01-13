import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [amounts, setAmounts] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0; // Initialize each product's amount to 0
      console.log(acc[product.id]);
      console.log(acc[product]);
      return acc;
    }, {})
  );

  const handleIncrement = (id) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: prevAmounts[id] + 1, // Increment the value
    }));
  };

  const handleDecrement = (id) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: Math.max(0, prevAmounts[id] - 1), // Decrement but prevent going below 0
    }));
  };

  const handleChange = (id, value) => {
    const numericValue = parseInt(value, 10);
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: isNaN(numericValue) ? 0 : numericValue, // Update with input value or reset to 0 if invalid
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Products</h1>
        <ul className="product-list">
          {products.map(
            (product) =>
              (amounts[product.id] = (
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
                  <div>
                    <button
                      id={`${product.id}-decrement`}
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </button>
                    <input
                      id={`${product.id}-amount`}
                      name="amount"
                      type="number"
                      value={amounts[product.id]}
                      onChange={(e) => handleChange(product.id, e.target.value)}
                    />
                    <button
                      id={`${product.id}-increment`}
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <button id={`${product.id}-addToCart`}>Add to cart</button>
                </li>
              ))
          )}
        </ul>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Shop;
