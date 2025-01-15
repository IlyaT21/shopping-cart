import Featured from "../components/fetured/Featured";
import Hero from "../components/hero/Hero";
import Shop from "../components/shop/Shop";

function App() {
  return (
    <div className="homepage-body">
      <Hero></Hero>
      <Shop></Shop>
      <Featured></Featured>
    </div>
  );
}

export default App;
