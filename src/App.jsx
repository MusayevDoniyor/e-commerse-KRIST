import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import downArrow from "./assets/arrowDown.svg";
import searchIcon from "./assets/searchIcon.svg";
import heartIcon from "./assets/heartIcon.svg";
import cartIcon from "./assets/shoppingBasket.svg";
import menuCloseIcon from "./assets/menu-close.svg";
import menuOpenIcon from "./assets/menu-open.svg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <BrowserRouter>
        <header className="flex flex-col lg:flex-row justify-between items-center py-5 px-6">
          <div className="text-5xl">
            <NavLink to={"/"}>KRIST</NavLink>
          </div>

          <div className="lg:hidden flex justify-between items-center w-full mt-4">
            <button className="text-lg" onClick={toggleMenu}>
              {menuOpen ? (
                <img src={menuCloseIcon} alt="Close Menu" />
              ) : (
                <img src={menuOpenIcon} alt="Open Menu" />
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

              <li>
                <NavLink to={"/cart"}>
                  <img src={cartIcon} alt="Cart Page Icon" />
                </NavLink>
              </li>
            </ul>
          </div>

          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:block lg:flex lg:items-center lg:gap-6 text-lg mt-4 lg:mt-0`}
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

            <li>
              <NavLink to={"/cart"}>
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
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
