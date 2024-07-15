import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "./pages/Products/Products";
import downArrow from "./assets/arrowDown.svg";
import searchIcon from "./assets/searchIcon.svg";
import heartIcon from "./assets/heartIcon.svg";
import cartIcon from "./assets/shoppingBasket.svg";
import menuCloseIcon from "./assets/menu-close.svg";
import menuOpenIcon from "./assets/menu-open.svg";
import backIcon from "./assets/backIcon.svg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };

  return (
    <>
      <BrowserRouter>
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col lg:flex-row justify-between items-center py-5 px-6 bg-white">
          <div className="text-5xl">
            <NavLink to={"/"}>KRIST</NavLink>
          </div>

          <div className="lg:hidden flex justify-between items-center w-full mt-4">
            <button className="text-lg" onClick={toggleMenu}>
              {menuOpen ? (
                <img src={menuOpenIcon} alt="Open Menu" />
              ) : (
                <img src={menuCloseIcon} alt="Close Menu" />
              )}
            </button>

            <ul className="flex gap-6 items-center">
              <li>
                <NavLink to={"/"}>
                  <img src={searchIcon} alt="Search Icon" />
                </NavLink>
              </li>

              <li>
                <NavLink to={"/"}>
                  <img src={heartIcon} alt="Favourites Page Icon" />
                </NavLink>
              </li>

              <li className="relative">
                <NavLink to="#" onClick={toggleCartModal}>
                  {cart.length > 0 && (
                    <span className="absolute bg-black text-white rounded-full text-center items-center py-[2px] px-[8px] text-sm bottom-4 left-3">
                      {cart.length}
                    </span>
                  )}
                  <img src={cartIcon} alt="Cart Page Icon" />
                </NavLink>
              </li>
            </ul>
          </div>

          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            }  lg:flex lg:items-center lg:gap-6 text-lg mt-4 lg:mt-0`}
          >
            <ul className="flex flex-col lg:flex-row gap-6">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>

              <li>
                <NavLink to={"/"}>
                  <span className="flex items-center">
                    Shop
                    <img src={downArrow} alt="Arrow Down" className="ml-1" />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/"}>Our Story</NavLink>
              </li>

              <li>
                <NavLink to={"/"}>Blog</NavLink>
              </li>

              <li>
                <NavLink to={"/"}>Contact Us</NavLink>
              </li>

              <li className="lg:hidden">
                <button className="bg-black text-white py-3 px-8 rounded-xl">
                  Login
                </button>
              </li>
            </ul>
          </nav>

          <ul className="hidden lg:flex gap-6 items-center">
            <li>
              <NavLink to={"/"}>
                <img src={searchIcon} alt="Search Icon" />
              </NavLink>
            </li>

            <li>
              <NavLink to={"/"}>
                <img src={heartIcon} alt="Favourites Page Icon" />
              </NavLink>
            </li>

            <li className="relative">
              <NavLink to="#" onClick={toggleCartModal}>
                {cart.length > 0 && (
                  <span className="absolute bg-black text-white rounded-full text-center items-center py-[2px] px-[8px] text-sm bottom-4 left-3">
                    {cart.length}
                  </span>
                )}
                <img src={cartIcon} alt="Cart Page Icon" />
              </NavLink>
            </li>

            <li>
              <button className="bg-black text-white py-3 px-8 rounded-xl">
                Login
              </button>
            </li>
          </ul>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Products
                cart={cart}
                setCart={setCart}
                products={products}
                setProducts={setProducts}
                toggleCartModal={toggleCartModal}
              />
            }
          />
        </Routes>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 ${
            cartModalOpen ? "visible" : "invisible"
          }`}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <img
                src={backIcon}
                alt="Go Back Icon"
                className="cursor-pointer"
                onClick={() => {
                  setCartModalOpen(!cartModalOpen);
                }}
              />
              <h2 className="text-2xl font-bold">Cart</h2>
              <button
                className={`text-gray-500 hover:text-gray-700 ${
                  cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (cart.length > 0) {
                    setCart([]);
                  }
                }}
              >
                Remove All
              </button>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((productId) => {
                  const product = products.find((p) => p.id === productId);
                  if (!product) return null;

                  return (
                    <div
                      key={product.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-medium">
                            {product.name}
                          </h3>
                          <p className="text-gray-600">{product.price}</p>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCart(cart.filter((id) => id !== product.id));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
