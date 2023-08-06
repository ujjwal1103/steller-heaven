import React from "react";

import { Outlet } from "react-router-dom";
import DashboardNavigation from "./DashboardNavigation";

const DashboardLayout = () => {
  return (
    <div
      className="w-full
    flex flex-row relative"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <DashboardNavigation/>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
