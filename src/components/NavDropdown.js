import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";

const NavDropdown = ({ userId, handleToggle, logoutUser }) => {
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, handleToggle);

  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      exit={{ opacity: 0, scale: 0.5 }}
      ref={dropdownRef}
      className="lg:w-72 lg:rounded-md   absolute top-16 right-0 py-2 w-full origin-center bg-white divide-y divide-gray-100  shadow-lg  "
    >
      <li className="py-2 px-4 hover:bg-gray-100">
        <NavLink
          to={`/profile/${userId}`}
          className="block text-gray-700"
          onClick={handleToggle}
        >
          Profile
        </NavLink>
      </li>
      <li className="py-2 px-4 hover:bg-gray-100">
        <NavLink
          to={`/myorders/${userId}`}
          className="block text-gray-700"
          onClick={handleToggle}
        >
          Orders
        </NavLink>
      </li>
      <li className="py-2 px-4 hover:bg-gray-100">
        <NavLink
          to={`/wishlist/${userId}`}
          className="block text-gray-700"
          onClick={handleToggle}
        >
          Wishlists
        </NavLink>
      </li>
      <li className="py-2 px-4 hover:bg-gray-100">
        <NavLink
          to={`/messenger`}
          className="block text-gray-700"
          onClick={handleToggle}
        >
          Messenger
        </NavLink>
      </li>
      <li className="py-2 px-4 hover:bg-gray-100">
        <button onClick={logoutUser} className="block text-gray-700">
          Logout
        </button>
      </li>
    </motion.ul>
  );
};

export default NavDropdown;
