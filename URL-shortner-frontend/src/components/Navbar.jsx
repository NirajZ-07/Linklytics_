import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeMenu = () => setNavbarOpen(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    closeMenu();
    navigate("/login");
  };

  // Mobile: full-width block links with a separator; desktop: inline links.
  const linkClass = (to) =>
    `block sm:inline py-3 sm:py-0 border-b border-white/20 sm:border-0 transition-all duration-150 hover:text-white ${
      path === to ? "text-white font-semibold" : "text-white/80 font-medium"
    }`;

  const actionBtnClass =
    "inline-block mt-4 sm:mt-0 bg-rose-700 hover:bg-rose-800 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md shadow-md transition-all duration-150";

  return (
    <div className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
        <Link to="/" onClick={closeMenu}>
          <h1 className="font-bold text-3xl text-white italic">Linklytics</h1>
        </Link>

        <ul
          className={`flex sm:flex-row flex-col sm:items-center sm:gap-10 sm:static absolute left-0 top-16 w-full sm:w-fit px-6 sm:px-0 z-50
            bg-gradient-to-r from-blue-600 to-purple-600 sm:bg-none sm:py-0
            transition-all duration-200 ${
              navbarOpen
                ? "max-h-96 pb-6 pt-2 shadow-lg sm:shadow-none"
                : "max-h-0 overflow-hidden sm:max-h-none sm:overflow-visible"
            }`}
        >
          <li>
            <Link className={linkClass("/")} to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link className={linkClass("/about")} to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>

          {token && (
            <li>
              <Link
                className={linkClass("/dashboard")}
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </li>
          )}

          <li>
            {token ? (
              <button onClick={onLogOutHandler} className={actionBtnClass}>
                LogOut
              </button>
            ) : (
              <Link to="/register" onClick={closeMenu} className={actionBtnClass}>
                SignUp
              </Link>
            )}
          </li>
        </ul>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center"
          aria-label={navbarOpen ? "Close menu" : "Open menu"}
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
