import React from "react";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Sortby from "./Sortby";

const Layout = () => {
  return (
    <div className="flex h-page overflow-hidden">
      <Sidebar />
      <div className="flex-1 ">
        <div className="w-full flex justify-end pr-3 p-6 bg-gray-300 shadow-md">
          <Sortby />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
