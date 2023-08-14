import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../utils/getUser";
import avatar from "../assets/avatar.svg";
import logo from "../assets/logo.png";
import { logout } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

import { toast } from "react-toastify";

import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser() || "";

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery !== "") {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    dispatch(logout());
    setIsDropdownOpen(false);
    toast.info("User logout", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      hideProgressBar: true,
      theme: "colored",
    });
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return <></>;
  }

  return (
    <nav className="bg-gray-800 z-50 text-white px-4 py-2 sticky top-0 ">
      <div className=" lg:mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5  ">
            {currentUser && currentUser?.user && (
              <motion.span
                onClick={handleToggle}
                className={`md:hidden text-gray-300 lg:hidden hover:text-white  p-3 rounded-md text-base font-medium   
              }`}
              >
                <img
                  src={currentUser?.user?.dp || avatar}
                  alt={currentUser?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </motion.span>
            )}
            {isDropdownOpen && (
              <NavDropdown
                userId={currentUser?.user?._id}
                handleToggle={handleToggle}
                logoutUser={logoutUser}
              />
            )}
            <NavLink
              to="/"
              className="text-white w-52 lg:w-80  pr-5 text-2xl font-bold"
            >
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </NavLink>
          </div>

          <div className="hidden md:flex gap-5 items-center lg:w-3/4 lg:justify-end">
            <div className=" w-1/2 mr-4">
              <form className="w-full relative" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-4 py-2 text-gray-900 rounded-md focus:outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 h-full w-12 flex items-center justify-center text-gray-600"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            <NavLink
              to="/cart"
              className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative ${
                location.pathname === "/cart" ? "bg-gray-700" : ""
              }`}
            >
              <FiShoppingCart className="inline-block mr-1 -mt-1" />
              Cart
              {totalProducts > 0 && (
                <span className="bg-blue-500 text-white rounded-full absolute top-0 right-0 transform translate-x-2 -translate-y-2 px-2 py-1 text-xs">
                  {totalProducts}
                </span>
              )}
            </NavLink>
            {currentUser && currentUser?.user && (
              <motion.span
                onClick={handleToggle}
                className={`  hidden text-gray-300 w-fit hover:text-white md:block lg:block px-3 py-2 rounded-md text-base font-medium   
              }`}
              >
                <img
                  src={currentUser?.user?.dp || avatar}
                  alt={currentUser?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </motion.span>
            )}
            {!currentUser.user && (
              <NavLink
                to="/login"
                className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/login" ? "bg-gray-700" : ""
                }`}
              >
                Login
              </NavLink>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-400  hover:text-white focus:outline-none focus:text-white"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden lg:hidden absolute p-4 -left-0 bg-gray-800 w-full"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className=" flex items-center justify-center gap-5">
              <form onSubmit={handleSearchSubmit} className=" w-full relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full  px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 h-full w-12 flex items-center justify-center text-gray-600"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            <NavLink
              to="/products"
              className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/products" ? "bg-gray-700" : ""
              }`}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={`text-gray-300  hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium relative ${
                location.pathname === "/cart" ? "bg-gray-700" : ""
              }`}
            >
              <FiShoppingCart className="inline-block mr-1 -mt-1" />
              Cart
              {totalProducts > 0 && (
                <span className="bg-blue-500 text-white rounded-full absolute top-0 right-0 transform translate-x-2 -translate-y-2 px-2 py-1 text-xs">
                  {totalProducts}
                </span>
              )}
            </NavLink>
            {!currentUser.user && (
              <NavLink
                to="/login"
                className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/login" ? "bg-gray-700" : ""
                }`}
              >
                Login
              </NavLink>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
