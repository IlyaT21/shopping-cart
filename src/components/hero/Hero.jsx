import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero-section">
      <h1>Welcome to Our Shop!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto totam
        reprehenderit omnis doloribus aperiam ipsa expedita? Consequuntur, animi
        blanditiis deleniti quasi, cumque error, adipisci laboriosam unde
        nesciunt ratione dignissimos tempora!
      </p>
      <Link to="shop">Shop</Link>
    </div>
  );
}

export default Hero;
