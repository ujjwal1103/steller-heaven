import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import Input from "../components/Input";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import View from "./View";
import { FaEdit } from "react-icons/fa";


const EditUser = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [user, setuser] = useState(null);
  const [editmode, setEditMode] = useState(true);
  const {
    register,
    handleSubmit,
  } = useForm({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await makeRequest.get(`user/${id}`);
        console.log(response.data.user);
        setuser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id, editmode]);

  const onSubmit = async (data) => {
    try {
      const response = await makeRequest.put(`user/${user?._id}`, data);
      console.log(response.data);
      if (response.data.isSuccess) {
        setuser(response.data.user);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("form values", data);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleEdit = () => {
    setEditMode(!editmode);
  };

  return (
    <div className="container p-4 flex-1 overflow-y-scroll">
      <div className="flex gap-4 justify-between">
        <h1 className="text-2xl font-bold pl-4">{user._id}</h1>
        {!editmode && (
          <Button
            onClick={handleEdit}
            className={"p-2 border flex justify-center items-center"}
            icon={<FaEdit />}
          />
        )}
      </div>
      {editmode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <Input
              label="Name"
              type="text"
              id="name"
              placeholder={"Enter Your Name"}
              register={register}
              errorMessage={"Name is required"}
              defaultValue={user?.name}
            />
          </div>
          <div className="flex">
            <Input
              label="Email"
              type="text"
              id="email"
              placeholder={"Enter Your Email"}
              register={register}
              errorMessage={"Email is required"}
              defaultValue={user?.email}
            />
            <Input
              label="Mobile Number"
              type="MobileNumber"
              id="price"
              placeholder={"product Price"}
              register={register}
              errorMessage={"Price is required"}
              defaultValue={user?.mobileNumber}
            />
            <Input
              label="Gender"
              type="text"
              id="gender"
              register={register}
              defaultValue={user?.gender}
            />
          </div>

          <div className="p-4 flex justify-end gap-5">
            <Button
              type={"submit"}
              text={"EDIT"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
            <Button
              type={"button"}
              text={"Cancel"}
              onClick={() => {
                handleEdit();
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      ) : (
        <View user={user} setEditMode={setEditMode} />
      )}
    </div>
  );
};

export default EditUser;
