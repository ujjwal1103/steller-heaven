import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { FaStar, FaRegStar } from "react-icons/fa";
import Button from "../shared/button/Button";
import { makeRequest } from "../api/makeRequest";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/slices/reviewSlice";

const RateProduct = ({ productId, customerId, setRateProduct }) => {
  const [selectedStar, setSelectedStars] = useState(0);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({});
  console.log(selectedStar);

  const onSubmit = async (data) => {
    const review = {
      product: productId,
      user: customerId,
      rating: selectedStar,
      title: data.title,
      description: data.description,
    };

    const res = await makeRequest.post(`productReviews`, review);
    if (res.data.isSuccess) {
      dispatch(addReview(res.data.reviews));
      setRateProduct(false);
    }

    console.log(res);
  };
  return (
    <div className=" bg-gray-50 mb-5 shadow-md backdrop-blur-md py-4 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-gray-50 m-auto w-1/2"
      >
        <div className="flex p-5 gap-3">
          {[1, 2, 3, 4, 5].map((index) => (
            <span className="text-2xl" onClick={() => setSelectedStars(index)}>
              {selectedStar >= index ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar />
              )}
            </span>
          ))}
        </div>
        <Input id={"title"} register={register} label={"Title"} />
        <Input
          id={"description"}
          register={register}
          label={"Description"}
          multiple
        />
        <div className="flex justify-end gap-5 px-5">
          <Button
            text={"Submit"}
            type="submit"
            className={"bg-blue-500 text-gray-50 p-2 rounded-md "}
          />
          <Button
            text={"Cancel"}
            type="button"
            onClick={() => setRateProduct(false)}
            className={"bg-gray-500 text-gray-50 p-2 rounded-md "}
          />
        </div>
      </form>
    </div>
  );
};

export default RateProduct;
