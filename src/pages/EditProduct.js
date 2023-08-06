import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import Input from "./../components/Input";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import View from "./View";
import { FaEdit } from "react-icons/fa";
import ImagesSelect from "../components/ImagesSelect";
import PhotoGalary from "./PhotoGalary";

const EditProduct = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [product, setProduct] = useState(null);
  const [editmode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await makeRequest.get(`product/${id}`);
        console.log(response.data.product);
        setProduct(response.data.product);
        setPreviewUrls(response.data.product.images);
        setValue("images", previewUrls)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    console.count();
  }, [id, editmode]);

  const onSubmit = async (data) => {
    const isValid = watch("images").length === 0 && previewUrls.length === 0;

    if (isValid) {
      setError("images", {
        type: "auto",
        message: "Atleast select one Image",
      });
      return;
    }
    try {
      const response = await makeRequest.put(`product/${product?._id}`, data);
      console.log(response.data);
      if (response.data.isSuccess) {
        setProduct(response.data.product);
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
        <h1 className="text-2xl font-bold pl-4">{product._id}</h1>
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
          <div className="flex p-5 flex-1 gap-5">
            <div className="flex flex-1 flex-col">
              <span className="w-full mb-3">Category</span>
              <span className="border-2 p-2 rounded-md">
                {product.category.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="mb-3 w-full">Subcategory</span>
              <span className="border-2 p-2 rounded-md">
                {product.subcategory.name}
              </span>
            </div>
          </div>
          <div>
            <Input
              label="Title"
              type="text"
              id="title"
              placeholder={"add product title here"}
              register={register}
              errorMessage={"Title is required"}
              defaultValue={product?.title}
            />
          </div>
          <div className="flex items-center">
            <ImagesSelect
              id={"images"}
              label={"Upload Images"}
              register={register}
              error={errors.images}
              hidden={true}
              setValue={setValue}
              clearErrors={clearErrors}
              previewUrls={previewUrls}
              setPreviewUrls={setPreviewUrls}
            />
          </div>
          <div className="flex">
            <Input
              label="brand"
              type="text"
              id="brand"
              placeholder={"add product brand here"}
              register={register}
              errorMessage={"brand is required"}
              defaultValue={product?.brand}
            />
            <Input
              label="Price"
              type="number"
              id="price"
              placeholder={"product Price"}
              register={register}
              errorMessage={"Price is required"}
              defaultValue={product?.price}
            />
            <Input
              label="MRP"
              type="number"
              id="MRP"
              placeholder={"product MPR"}
              register={register}
              errorMessage={"MRP is required"}
              defaultValue={product?.MRP}
            />
            <Input
              label="quantity"
              type="number"
              id="quantity"
              placeholder={"product quantity"}
              register={register}
              errorMessage={"quantity is required"}
              defaultValue={product?.quantity}
            />
          </div>

          <div className="h-72">
            <Input
              label="Description"
              type="text"
              id="description"
              placeholder={"product description"}
              register={register}
              errorMessage={"description is required"}
              defaultValue={product?.description}
              multiple={true}
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
                clearErrors("images");
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      ) : (
        <View product={product} setEditMode={setEditMode} />
      )}
    </div>
  );
};

export default EditProduct;
