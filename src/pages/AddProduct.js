import React, { useState } from "react";
import Input from "../components/Input";
import InputSelect from "../components/InputSelect";
import Button from "../components/Button";
import ImagesSelect from "../components/ImagesSelect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/slices/productSlice.js";
import { useDispatch } from "react-redux";
import { makeRequest } from "../api/makeRequest";
import ColorInput from "../components/ColorInput";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      brand: "",
      description: "",
      price: "",
      MRP: "",
      images: [],
      category: "",
      subcategory: "",
      quantity: "",
      colors: [{ value: "" }],
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await makeRequest.post("product", data, {});
      if (res.data.isSuccess) {
        alert(res.data.message);
        console.log(res.data.product);
        dispatch(addProduct(res.data.product));
        reset();
      }
      clearErrors("images");
      setPreviewUrls([]);
      reset();
      navigate("/allProducts");
    } catch (error) {
      console.error(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  const handleReset = () => {
    reset();
    setValue("subcategory", null);
    setValue("category", null);
    setPreviewUrls([]);
  };

  return (
    <div className="overflow-hidden flex-1">
      <div className="bg-gray-100 lg:p-10 h-full overflow-scroll lg:scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <div className="w-full mb-10 lg:p-10 p-5 bg-white rounded-lg shadow-lg flex justify-start gap-5 lg:items-center flex-wrap flex-col lg:flex-row">
          <h1 className="text-3xl font-bold flex-1">Add New Product</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  lg:p-10 p-5 bg-white rounded-lg shadow-lg flex flex-col"
        >
          <div className="flex w-full flex-col lg:flex-row">
            <InputSelect
              id={"category"}
              label={"Category"}
              control={control}
              placeholder={"select category"}
              setValue={setValue}
              reset={reset}
            />
            {watch("category") && (
              <InputSelect
                id={"subcategory"}
                label={"SubCategory"}
                categoryId={watch("category")}
                control={control}
                placeholder={"select subcategory"}
                isDisabled={watch("category") ? false : true}
                setValue={setValue}
              />
            )}
          </div>
          <Input
            label="Title"
            type="text"
            id="title"
            placeholder={"add product title here"}
            register={register}
            errorMessage={"Title is required"}
            error={errors?.title}
          />
          <div className="flex w-full flex-wrap">
            <Input
              label="Brand"
              type="text"
              id="brand"
              placeholder={"product Brand"}
              register={register}
              errorMessage={"Brand is required"}
              error={errors?.brand}
            />
            <Input
              label="MRP"
              type="number"
              id="MRP"
              placeholder={"product MRP"}
              register={register}
              errorMessage={"MRP is required"}
              error={errors?.MRP}
            />
            <Input
              label="Price"
              type="number"
              id="price"
              placeholder={"product Price"}
              register={register}
              errorMessage={"Price is required"}
              error={errors?.price}
            />
            <Input
              label="Quantity"
              type="number"
              id="quantity"
              placeholder={"product quantity"}
              register={register}
              errorMessage={"quantity is required"}
              error={errors?.quantity}
            />
          </div>
          <div>
            <ImagesSelect
              id={"images"}
              label={"Upload Images"}
              register={register}
              errorMessage={"Images is required"}
              hidden={true}
              setValue={setValue}
              clearErrors={clearErrors}
              previewUrls={previewUrls}
              setPreviewUrls={setPreviewUrls}
            />
          </div>
          <Input
            label="Description"
            type="text"
            id="description"
            placeholder={"product description"}
            register={register}
            error={errors.description}
            multiple={true}
          />
          <ColorInput
            register={register}
            error={errors}
            control={control}
            maxColors={4}
            label={"Choose Four Colors"}
          />
          <div className="flex w-full">
            <Button type={"submit"} title={"Save"} />
            <Button type={"button"} title={"Reset"} onClick={handleReset} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
