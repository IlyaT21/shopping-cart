import { Link } from "react-router-dom";

function Shop() {
  return (
    <div className="shop-section">
      <img src="/public/shop-img.jpg" alt="Shop img" />
      <div className="text-holder">
        <h2>Visit our shop</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum quo
          animi, dolore tenetur maxime cum velit optio iure impedit omnis sit
          atque consequuntur nesciunt corporis ad non similique? Consectetur,
          animi!
        </p>
        <Link to="shop">Shop</Link>
      </div>
    </div>
  );
}

export default Shop;
