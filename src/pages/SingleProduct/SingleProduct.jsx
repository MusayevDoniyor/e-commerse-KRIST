import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import star from "../../assets/star.svg";
import halfStar from "../../assets/halfStar.svg";
import emptyStar from "../../assets/emptyStar.svg";
import heartIcon from "../../assets/heartIcon.svg";

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductById();
  }, [productId]);

  const renderStars = (ratings_stars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratings_stars) {
        stars.push(
          <i key={i} className="star">
            <img
              src={star}
              alt="star"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      } else if (i === Math.ceil(ratings_stars) && ratings_stars % 1 !== 0) {
        stars.push(
          <i key={i}>
            <img
              src={halfStar}
              alt="HalfStar"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      } else {
        stars.push(
          <i key={i}>
            <img
              src={emptyStar}
              alt="Empty Star"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </i>
        );
      }
    }
    return stars;
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <section className="mt-[125px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : product ? (
        <>
          <p className="text-gray-500 text-sm">
            Home &gt; Shop &gt; {product.name}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <img
                src={product.image_url}
                alt=""
                className="w-full h-auto max-w-[500px] mx-auto"
              />
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-bold">
                {product.brand_name}
              </h1>
              <h2 className="text-xl md:text-2xl">{product.name}</h2>

              <div className="flex items-center my-4">
                {renderStars(product.ratings_stars)}
                <span className="text-gray-400 pl-5 text-sm md:text-base">
                  <span>{product.ratings_stars} </span>
                  <span>({product.rating_counts} Reviews)</span>
                </span>
              </div>

              <p className="text-xl md:text-2xl font-bold">${product.price}</p>

              <p className="text-gray-700 text-sm md:text-base">
                {product.description}
              </p>

              <div className="mt-6">
                <h3 className="text-xl md:text-2xl font-medium">Color</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.color_options.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        background: color,
                      }}
                      className="w-8 h-8 mt-2 rounded-md mr-2 cursor-pointer outline-none outline border border-[#333] checked:ring-2 checked:ring-gray-800"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl md:text-2xl font-medium">Size</h3>
                <div className="flex flex-wrap mt-2 gap-2 mb-4">
                  <div
                    onClick={() => handleSizeSelect("S")}
                    className={`w-8 h-8 rounded-md mr-2 cursor-pointer text-center items-center outline-none outline border ${
                      selectedSize === "S"
                        ? "bg-black text-white"
                        : "border-[#333]"
                    }`}
                  >
                    S
                  </div>

                  <div
                    onClick={() => handleSizeSelect("M")}
                    className={`w-8 h-8 rounded-md mr-2 cursor-pointer text-center items-center outline-none outline border ${
                      selectedSize === "M"
                        ? "bg-black text-white"
                        : "border-[#333]"
                    }`}
                  >
                    M
                  </div>

                  <div
                    onClick={() => handleSizeSelect("L")}
                    className={`w-8 h-8 rounded-md mr-2 cursor-pointer text-center items-center outline-none outline border ${
                      selectedSize === "L"
                        ? "bg-black text-white"
                        : "border-[#333]"
                    }`}
                  >
                    L
                  </div>

                  <div
                    onClick={() => handleSizeSelect("XL")}
                    className={`w-8 h-8 rounded-md mr-2 cursor-pointer text-center items-center outline-none outline border ${
                      selectedSize === "XL"
                        ? "bg-black text-white"
                        : "border-[#333]"
                    }`}
                  >
                    XL
                  </div>

                  <div
                    onClick={() => handleSizeSelect("XXL")}
                    className={`w-8 h-8 rounded-md mr-2 cursor-pointer text-center items-center outline-none outline border ${
                      selectedSize === "XXL"
                        ? "bg-black text-white"
                        : "border-[#333]"
                    }`}
                  >
                    XXL
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <div className="flex items-center gap-3 border border-black rounded-lg px-4 py-2 sm:px-6 sm:py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => setCount(count + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M20 12L4 12"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <p className="text-base">{count}</p>

                  <span
                    className="cursor-pointer"
                    onClick={() => setCount(count - 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      color="#000"
                      fill="none"
                    >
                      <path
                        d="M12 4V20M20 12H4"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <button className="bg-black text-white px-8 sm:px-24 py-2 sm:py-3 rounded-lg">
                  Add to Cart
                </button>

                <div className="border border-black rounded-lg px-3 py-2 sm:py-3">
                  <img
                    src={heartIcon}
                    alt="Like icon"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Product not found</p>
      )}
    </section>
  );
};

export default SingleProduct;
