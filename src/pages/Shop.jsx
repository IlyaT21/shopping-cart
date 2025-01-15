import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
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

  const handleChange = (id, value) => {
    const numericValue = parseInt(value, 10);
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemove = (title) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[title];
      return updatedQuantities;
    });
  };

  const [quantities, setQuantities] = React.useState(
    cart.reduce((acc, item) => {
      acc[item.title] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value, 10);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity,
    }));
  };

    const [isCartActive, setIsCartActive] = useState(false); // State for toggling

    const toggleCart = () => {
      setIsCartActive((prevState) => !prevState); // Toggle active state
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button id="toggleCart" onClick={toggleCart}>
        Cart
      </button>
      <div id="shopDrawer" className={isCartActive ? "active" : ""}>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => {
              const quantity = quantities[item.title] ?? 1;
              return (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <input
                    id={item.title}
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.title, e.target.value)
                    }
                  />
                  <p>Total: ${(item.price * quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemove(item.title)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h3>
          Total Price: $
          {cart
            .reduce(
              (acc, item) => acc + item.price * (quantities[item.title] ?? 1),
              0
            )
            .toFixed(2)}
        </h3>
        <button>Buy</button>
      </div>
      <div>
        <h1 className="shop">Products</h1>
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
              <div>
                <input
                  id={`${product.id}-amount`}
                  name="amount"
                  type="number"
                  defaultValue={1}
                  onChange={(e) => {
                    const updatedValue = handleChange(
                      product.id,
                      e.target.value
                    );
                    console.log(
                      `Product ID: ${product.id}, Updated Value: ${updatedValue}`
                    );
                  }}
                />
              </div>
              <button
                id={`${product.id}-addToCart`}
                onClick={() => handleAddToCart(product)}
                disabled={cart.some((item) => item.id === product.id)}
              >
                {cart.some((item) => item.id === product.id)
                  ? "In Cart"
                  : "Add to cart"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Shop;
