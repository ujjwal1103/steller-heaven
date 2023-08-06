import React, { useState } from "react";

import { NumericFormat } from "react-number-format";
import Info from "./../components/Info";

import Swal from "sweetalert2";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import ProductImagePreview from "../components/ProductImagePreview";
import Button from "../shared/button/Button";
import { makeRequest } from "../api/makeRequest";
import { useNavigate } from "react-router-dom";

const View = ({ product, setEditMode }) => {
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await makeRequest.delete(`product/${product?._id}`);
      if (res.data.isSuccess) {
        navigate("/allProducts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starComponents = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      starComponents.push(<FaStar key={`star-${i}`} />);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      starComponents.push(<FaStarHalfAlt key="star-half" />);
    }

    // Render empty stars to complete the rating
    while (starComponents.length < 5) {
      starComponents.push(
        <FaRegStar key={`star-empty-${starComponents.length}`} />
      );
    }

    return <div className="flex gap-1">{starComponents}</div>;
  };

  return (
    <div className="p-10  flex flex-col  gap-10  pb-10 ">
      <div className="flex flex-col gap-10 h-full">
        <div className="flex gap-5 lg:flex-col-reverse p-5 border">
          <div className="flex flex-wrap justify-center  flex-row gap-5">
            {product.images?.map((img, ind) => (
              <img
                src={img}
                alt=""
                key={img}
                className="lg:w-24 w-16 aspect-square border object-contain "
                onClick={() => setIndex(ind)}
              />
            ))}
          </div>
          <div className="w-full h-full grid place-content-center">
            {product.images && (
              <img
                src={product.images[index]}
                alt=""
                className="lg:w-80 w-44 h-52 object-contain"
                onClick={() => setPreview(true)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="lg:p-10 p-5 border flex-1 flex flex-col gap-5 ">
        <Info title={"Product Id"}>{product?._id}</Info>
        <Info title={"Category"}>{product?.category?.name}</Info>
        <Info title={"Subcategory"}>{product?.subcategory?.name}</Info>
        <Info title={"Barnd"}>{product?.brand}</Info>
        <Info title={"Product Title"}>{product?.title}</Info>
        <Info title={"Product price"}>
          ₹
          <NumericFormat
            value={product?.price}
            displayType="text"
            thousandSeparator=","
          />
        </Info>
        <Info title={"Product MRP"}>
          ₹
          <NumericFormat
            value={product?.MRP}
            displayType="text"
            thousandSeparator=","
          />
        </Info>
        <Info title={"Colors"}>red blue green</Info>
        <Info title={"Product Quantity"}>{product?.quantity}</Info>

        <Info title={"Warranty"}>1 year warranty</Info>

        <Info title={"Description"}>{product?.description}.</Info>
      </div>
      <div className="flex justify-end gap-3">
        <Button
          text="Edit"
          icon={<FaEdit />}
          onClick={() => setEditMode(true)}
          className={
            "border rounded-md p-2 flex items-center justify-center text-gray-50 bg-blue-500 hover:bg-blue-600"
          }
        />
        <Button
          icon={<FaTrash />}
          onClick={() => {
            Swal.fire({
              title: "Are you sure !",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            });
          }}
          text="Delete"
          className={
            "border rounded-md p-2 flex items-center justify-center text-gray-50 bg-red-500 hover:bg-red-600"
          }
        />
      </div>
      {preview && (
        <ProductImagePreview images={product.images} setPreview={setPreview} />
      )}
    </div>
  );
};

export default View;
