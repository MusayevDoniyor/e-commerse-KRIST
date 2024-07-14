import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import api from "../../api/api";
import checkedIcon from "../../assets/checkedIcon.svg";
import Card from "../../components/Card";
import downArrow from "../../assets/arrowDown.svg";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productsReducer.products);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandsOpen, setBrandsOpen] = useState(false);

  const colorMapping = {
    "#FFD700": "Gold",
    "#C0C0C0": "Silver",
    "#000000": "Black",
    "#800080": "Purple",
    "#FF69B4": "HotPink",
    "#4B0082": "Indigo",
    "#00CED1": "DarkTurquoise",
    "#2E8B57": "SeaGreen",
    "#8B0000": "DarkRed",
    "#FF4500": "OrangeRed",
    "#7FFF00": "Chartreuse",
    "#1E90FF": "DodgerBlue",
    "#FF1493": "DeepPink",
    "#00BFFF": "DeepSkyBlue",
    "#ADFF2F": "GreenYellow",
    "#FF6347": "Tomato",
    "#8A2BE2": "BlueViolet",
    "#A52A2A": "Brown",
    "#DEB887": "BurlyWood",
    "#5F9EA0": "CadetBlue",
    "#8B4513": "SaddleBrown",
    "#D2691E": "Chocolate",
    "#A0522D": "Sienna",
    "#808080": "Gray",
    "#FFFFFF": "White",
    "#696969": "DimGray",
    "#A9A9A9": "DarkGray",
    "#228B22": "ForestGreen",
    "#556B2F": "DarkOliveGreen",
    "#8FBC8F": "DarkSeaGreen",
    "#FF0000": "Red",
    "#2F4F4F": "DarkSlateGray",
    "#B0E0E6": "PowderBlue",
    "#4682B4": "SteelBlue",
  };

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorsOpen, setColorsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await api.get("/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching Brands:", error.message);
      }
    }

    async function fetchColors() {
      try {
        const response = await api.get("/colors");
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching Colors:", error.message);
      }
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = `${baseURL}/products`;

      const params = [];

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await api.get(`${baseURL}/products`);
        dispatch(addProducts(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const toggleAccordion = (setFunction, currentState) => {
    setFunction(!currentState);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[275px,1fr] gap-6 p-6">
      <aside className="bg-gray-50 p-6 rounded-lg">
        <div className="mb-4">Shop &gt; All Products</div>

        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleAccordion(setBrandsOpen, brandsOpen)}
        >
          <h3 className="text-2xl my-5 font-bold">Product Categories</h3>
          <img
            src={downArrow}
            alt="Toggle Brands"
            className={`transform transition-transform ${
              brandsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {brandsOpen && (
          <ul className="flex flex-col gap-5">
            {brands.map((brand, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={brand}
                    name="brand"
                    id={brand}
                    checked={brand === selectedBrand}
                    className="w-6 h-6 bg-transparent border-2 rounded-md border-black mr-2 appearance-none checked:bg-black checked:bg-[url('/src/assets/checkedIcon.svg')] checked:bg-no-repeat checked:bg-center"
                    style={{
                      backgroundImage:
                        selectedBrand === brand
                          ? `url(${checkedIcon})`
                          : "none",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <label htmlFor={brand} className="text-[15px] font-medium">
                    {brand}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleAccordion(setColorsOpen, colorsOpen)}
        >
          <h3 className="text-2xl font-bold my-5">Filter by Color</h3>
          <img
            src={downArrow}
            alt="Toggle Colors"
            className={`transform transition-transform ${
              colorsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {colorsOpen && (
          <ul className="grid grid-cols-2 gap-5">
            {colors.map((color, index) => (
              <li key={index} className="mr-7">
                <input
                  type="radio"
                  value={color}
                  name="color"
                  id={color}
                  checked={color === selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{
                    appearance: "none",
                    backgroundColor: color,
                  }}
                  className="w-7 h-7 rounded-md mr-2 cursor-pointer outline-none outline border border-[#333] checked:ring-2 checked:ring-gray-800 block"
                />
                <label htmlFor={color} className="text-[15px] font-medium">
                  {colorMapping[color]}
                </label>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="p-6 rounded-lg ">
        {loading ? (
          <p>Loading...</p>
        ) : products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
      </main>
    </div>
  );
};

export default Products;
