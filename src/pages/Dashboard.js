import React from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const { totalProducts } = useSelector((state) => state.products);
  const { totalUsers } = useSelector((state) => state.users);

  return (
    <div className="p-10 gap-10 flex-1 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-4 text-center">
            Total Products
          </h1>
          <span className="font-bold text-4xl text-blue-600 text-center">
            {totalProducts}
          </span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-4">
            Total Customers
          </h1>
          <span className="font-bold text-4xl text-blue-600">{totalUsers}</span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-4">
            Total Orders
          </h1>
          <span className="font-bold text-4xl text-blue-600">2300</span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-4">
            Monthly Revenue
          </h1>
          <span className="font-bold text-4xl text-blue-600">2300</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
