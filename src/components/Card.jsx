import { Link } from "react-router-dom";

const Card = ({ product, cart, setCart }) => {
  return (
    <div>
      <img src={product.image_url} alt={product.product_name} />
      <h4>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h4>
      <p>{product.description}</p>

      <div>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{
              background: color,
            }}
          />
        ))}
      </div>

      <strong>{product.price}</strong>
      <div>
        <button onClick={() => setCart([...cart, product.id])}>
          <span style={{ marginLeft: "0.8em" }}>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
