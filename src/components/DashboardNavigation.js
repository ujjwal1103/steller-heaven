import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "./../shared/button/Button";
import { BiSolidDashboard } from "react-icons/bi";
import { MdSettings, MdCategory } from "react-icons/md";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FaUserAlt, FaShoppingCart, FaImages } from "react-icons/fa";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const DashboardNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-72 hidden lg:block bg-gray-300 font-semibold py-5 shadow-md ">
      <ul className="flex flex-col h-full">
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
          >
            <BiSolidDashboard /> <span> Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/users"}
          >
            <FaUserAlt /> <span> Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/allproducts"}
          >
            <RiShoppingBag2Fill /> <span> Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/orders"}
          >
            <FaShoppingCart /> <span> Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/createSliderImage"}
          >
            <FaImages /> <span> Slider Images</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/addCategory"}
          >
            <MdCategory /> <span> Categories</span>
          </NavLink>
        </li>
        <li className="mt-auto">
          <NavLink
            className={({ isActive }) =>
              `py-5 px-5 hover:bg-gray-200 flex gap-5  items-center ${
                isActive && "bg-gray-50 text-gray-950"
              }`
            }
            to={"/settings"}
          >
            <MdSettings /> <span> Settings</span>
          </NavLink>
        </li>
        <li className="p-2">
          <Button
            text={"Logout"}
            className={
              "bg-gray-50 text-gray-950 py-2 px-2 w-1/2 block hover:bg-gray-200 rounded-md shadow-md text-lg m-auto"
            }
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          />
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavigation;
