import React, { useEffect, useState } from "react";
import { makeRequest } from "../api/makeRequest";
import { setUsers } from "../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const User = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const users = useSelector((state) => state.users.users);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });

    if (selectAll && selectedUsers.length === users?.length) {
      setSelectAll(false);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await makeRequest("users");
        if (res.data.isSuccess) {
          dispatch(setUsers(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(selectAll ? [] : users?.map((user) => user._id));
  };

  const isUserSelected = (userId) => selectedUsers.includes(userId);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 gap-6 justify-between">
          <h1 className="text-3xl font-bold ">Users ({users.length})</h1>

          <div className="border px-3 order-3 py-2 border-blue-900 rounded self-end">
            <button
              className="text-blue-900 font-semibold  "
              onClick={(_) => console.log(selectedUsers)}
            >
              Add New User
            </button>
          </div>
          <div className=" self-start">
            {selectedUsers.length > 0 && (
              <button onClick={(_) => console.log(selectedUsers)}>
                delete
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={
                      selectAll && selectedUsers.length === users?.length
                    }
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Mobile Number</th>
                <th className="px-4 py-2">Total Orders</th>
                <th className="px-4 py-2">Total Returns</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={isUserSelected(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{user.name}</td>
                  <td className="px-4 py-2 text-center">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.mobileNumber}</td>
                  <td className="px-4 py-2 text-center">{user.totalOrders}</td>
                  <td className="px-4 py-2 text-center">{user.totalReturns}</td>
                  <td className="px-4 py-2 text-center">
                  <Link
                        to={`editUser/${user?._id}`}
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
          {selectedUsers.length > 0 ? (
            selectedUsers.map((userId) => <span key={userId}>{userId}, </span>)
          ) : (
            <span>No users selected.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
