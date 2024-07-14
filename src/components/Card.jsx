import { Link } from "react-router-dom";

const Card = ({ product, cart, setCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative group">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-black px-10 py-3 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setCart([...cart, product.id])}
            className="bg-slate-200 hover:bg-slate-300 text-black font-medium px-2 py-3 rounded-md text-lg"
          >
            <span className="ml-2">Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-medium">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h4>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex gap-2 mb-4">
          {product.color_options.map((color, index) => (
            <div
              key={index}
              style={{
                background: color,
              }}
              className="w-7 h-7 rounded-md mr-2 cursor-pointer outline-none outline border border-[#333] checked:ring-2 checked:ring-gray-800"
            />
          ))}
        </div>

        <strong className="text-gray-800">{product.price}</strong>
      </div>
    </div>
  );
};

export default Card;
