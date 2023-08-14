import useFetchData from "../hooks/useFetchData";



import { Link, NavLink } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { makeRequest } from "../api/makeRequest";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const {  loading, products } = useFetchData();



  const [selectedProducts, setSelectedProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (userId) => {
    setSelectedProducts((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });

    if (selectAll && selectedProducts.length === users?.length) {
      setSelectAll(false);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await makeRequest("products");
        if (res.data.isSuccess) {
          setUsers(res.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedProducts(selectAll ? [] : users?.map((user) => user._id));
  };

  const isUserSelected = (userId) => selectedProducts.includes(userId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (products?.length === 0) {
    return (
      <div className="lg:w-2/3 p-10 m-auto lg:bg-gray-500 text-center flex flex-col justify-center items-center gap-5 lg:text-white font-bold mt-10 lg:rounded-md shadow-md">
        <h1>NO PRODUCTS AVAILABLE</h1>
        <NavLink
          to="/addproduct"
          className="p-3bg-gray-900  text-gray-100  rounded-md hover:bg-gray-700"
        >
          Add Products
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-400">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6 gap-6 justify-between">
            <h1 className="text-3xl font-bold ">Products</h1>
            <div className="border px-3 order-3 py-2 border-blue-900 rounded self-end">
              <NavLink
                className="text-blue-900 font-semibold  "
                to={"/addProduct"}
              >
                Add New Product
              </NavLink>
            </div>
            <div className="self-start">
              {selectedProducts.length > 0 && (
                <button onClick={(_) => console.log(selectedProducts)}>
                  delete
                </button>
              )}
            </div>
          </div>

          <div>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={
                        selectAll && selectedProducts.length === users?.length
                      }
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Subcategory</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">MRP</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Total sold</th>
                  <th className="px-4 py-2">Qauntity</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {users?.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={isUserSelected(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <img
                        className="w-12 h-12 object-contain"
                        src={user.images[0]}
                        alt={user.title}
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      {user.category.name}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {user.subcategory.name}
                    </td>
                    <td className="px-4 py-2 text-center">{user.title}</td>
                    <td className="px-4 py-2 text-center">{user.MRP}</td>
                    <td className="px-4 py-2 text-center">{user.price}</td>
                    <td className="px-4 py-2 text-center">120</td>
                    <td className="px-4 py-2 text-center">230</td>
                    <td className="px-4 py-2 text-center">
                      <Link
                        to={`editproduct/${user?._id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <strong>Selected Users: </strong>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((userId) => (
                <span key={userId}>{userId}, </span>
              ))
            ) : (
              <span>No users selected.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
