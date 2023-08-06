import React, { useEffect, useState } from "react";
import Button from "../shared/button/Button";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import clsx from "clsx";
import RateProduct from "./RateProduct";
import { getCurrentUser } from "../utils/getUser";
import { makeRequest } from "../api/makeRequest";
import { setReviews } from "../redux/slices/reviewSlice";
import { useDispatch, useSelector } from "react-redux";

const ReviewAndRating = ({ productId }) => {
  const currentUser = getCurrentUser();
  const [rateProduct, setRateProduct] = useState(false);
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const getQueries = async () => {
    try {
      const res = await makeRequest.get(`productReviews/${productId}`);
      if (res.data.isSuccess) {
        console.log(res.data.isSuccess);
        dispatch(setReviews(res.data.reviews));
        console.log(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <div className="border-2 p-5 ">
      <div className="pb-5 flex justify-between items-center ">
        <h1 className=" font-bold text-xl">Ratings & Reviews</h1>

        <Button
          text={"Rate Product"}
          onClick={() => setRateProduct(true)}
          className={"border rounded-md p-3 bg-gray-700 text-gray-50"}
        />
      </div>
      {rateProduct && (
        <RateProduct
          productId={productId}
          customerId={currentUser.user._id}
          setRateProduct={setRateProduct}
        />
      )}
      <div className="flex flex-col gap-5">
        {reviews?.map((i) => (
          <div
            className="bg-slate-50 flex flex-col gap-3 shadow-md p-3"
            key={i._id}
          >
            <div className="flex gap-3 items-center">
              <div
                className={clsx(
                  "flex items-center p-1 text-gray-50 font-bold  gap-1 rounded bg-green-500",
                  {
                    "bg-yellow-500": i?.rating === 3,
                    "bg-red-500": i?.rating < 3,
                  }
                )}
              >
                {i?.rating}
                <FaStar />
              </div>

              <div className="font-semibold">
                <span>{i.title}</span>
              </div>
            </div>
            <div>
              <p className="whitespace-pre-line">{i.description}</p>
            </div>
            <div>images</div>
            <div className="text-sm italic flex items-center gap-2">
              <span className="w-5 h-5 bg-gray-400  p-2 rounded-full"></span>
              <span> {i.user.name} </span>

              <span>{moment(i.createdAt).fromNow()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAndRating;
