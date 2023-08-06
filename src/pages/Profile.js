import React, { useState } from "react";
import { getCurrentUser } from "../utils/getUser";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillSetting, AiFillHeart } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import UploadProfilePic from "../components/UploadProfilePic";

const Profile = () => {
  const currentUser = getCurrentUser();
  const [editMode, setEditMode] = useState(false);
  const [dpUpload, setdpUpload] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const getUser = async () => {
    try {
      const res = await makeRequest.get(`user/${currentUser.user?._id}`);
      return res.data;
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };

  const {
    data: { user },
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: [],
    enabled: currentUser.user?._id.length > 0,
  });

  const mutation = useMutation(
    async (data) => {
      const response = await makeRequest.put(
        `user/${currentUser?.user?._id}`,
        data
      );
      return response.data;
    },

    {
      onSuccess: (data) => {
        setEditMode(false);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        console.log("success data", data);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };
  const handleSetEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="flex max-w-7xl h-page gap-10 mx-auto p-10">
      <div className="w-80 flex gap-10 flex-col ">
        <div className="bg-slate-100 h-24 flex gap-5 p-6 shadow-xl items-center">
          <div onClick={() => setdpUpload(true)}>
            <img
              src={user?.dp}
              alt=""
              className="w-14 rounded-full object-cover h-14"
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm">Hello</span>
            <span className="font-semibold  text-xl">{user?.name}</span>
          </div>
        </div>
        <div className="flex-grow bg-slate-100 shadow-xl">
          <ul className="p-6">
            <li className="border-b-2 py-3">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-5 text-xl"
              >
                <FaShoppingCart /> Dashboard
              </NavLink>
            </li>
            <li className="border-b-2 py-3">
              <h1 to="/myorders" className="flex items-center gap-5 text-xl">
                <AiFillSetting /> Account Settings
              </h1>
              <ul className="pt-2 flex flex-col gap-2">
                <li className="py-2 pl-12 bg-gray-200">
                  Persional Information
                </li>
                <li className="py-2 pl-12  bg-gray-200">Manage Addresses</li>
              </ul>
            </li>
            <li className="border-b-2 py-3">
              <NavLink
                to="/myorders"
                className="flex items-center gap-5 text-xl"
              >
                <FaShoppingCart /> My Orders
              </NavLink>
            </li>
            <li className="border-b-2 py-3 last:border-none">
              <NavLink
                to="/myorders"
                className="flex items-center gap-5 text-xl"
              >
                <AiFillHeart /> All Orders
              </NavLink>
            </li>
            <li className="border-b-2 py-3 last:border-none">
              <NavLink
                to={`/users/${currentUser?.user._id}`}
                className="flex items-center gap-5 text-xl"
              >
                <AiFillHeart /> My WishList
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {user && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow bg-slate-100  p-6"
        >
          <div className="flex items-center gap-6">
            <h1 className="pb-5 text-2xl font-bold"> Personal Information</h1>
            <span
              onClick={handleSetEdit}
              className="text-blue-700 pb-5 cursor-pointer"
            >
              EDIT
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold">
              Name
            </label>
            <input
              className={
                editMode
                  ? `bg-transparent py-2 border-2 px-2 my-3`
                  : `bg-transparent py-2`
              }
              type="text"
              placeholder="Enter Name"
              disabled={!editMode}
              {...register("name", { value: user?.name })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold">
              Gender
            </label>
            {!editMode ? (
              <p className="py-2">{user?.gender || "-"}</p>
            ) : (
              <div className="flex gap-5 items-center py-2">
                <input
                  type="radio"
                  defaultValue={user?.gender}
                  id="male"
                  value={"Male"}
                  {...register("gender")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  placeholder="Enter Name"
                  value={"Female"}
                  defaultValue={user.gender}
                  id="female"
                  {...register("gender")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor="female">Female</label>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold">
              Email Address
            </label>
            <input
              className={
                editMode
                  ? `bg-transparent py-2 border-2 px-2 my-3`
                  : `bg-transparent py-2`
              }
              type="email"
              autoComplete={false}
              placeholder="Enter Email"
              disabled={!editMode}
              {...register("email", { value: user?.email })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold">
              Mobile Number
            </label>
            <input
              className={
                editMode
                  ? `bg-transparent py-2 border-2 px-2 my-3`
                  : `bg-transparent py-2`
              }
              type="text"
              placeholder="Enter Mobile Number"
              disabled={!editMode}
              {...register("mobileNumber", {
                value: user?.mobileNumber || (editMode ? "" : "-"),
              })}
            />
          </div>
          {editMode && (
            <div className="flex gap-4 ">
              <Button
                text={"Save"}
                type={"submit"}
                className="p-3 w-44 bg-slate-700 text-gray-50"
              />
              <Button
                text={"Cancel"}
                type={"submit"}
                className="p-3 w-36 bg-slate-300 text-gray-700"
                onClick={() => setEditMode(false)}
              />
            </div>
          )}
        </form>
      )}
      {dpUpload && (
        <UploadProfilePic profile={user} setdpUpload={setdpUpload} />
      )}
    </div>
  );
};

export default Profile;
