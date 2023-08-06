import React from "react";

import { RiHeart3Line } from "react-icons/ri";
import { NumericFormat } from "react-number-format";
import { NavLink } from "react-router-dom";

export const ProductBox = ({ product }) => {
  return (
    <NavLink
      to={`/product/${product._id}`}
      className=" rounded-md mx-5 border inline-block shadow-md w-72  "
    >
      <article className="flex flex-col w-full h-full">
        <div className="flex justify-center items-center">
          <img
            alt={product?.title}
            className="block h-44 w-44 object-contain"
            src={product.images[0]}
          />
        </div>
        <header className="leading-tight p-2 md:p-4 h-24  flex flex-col justify-start ">
          <h1 className="text-lg line-clamp-2 ">{product?.title}</h1>
        </header>
        <p className="text-gray-500 px-4">{product?.brand}</p>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <p className="flex items-center text-black">
            <span className="text-2xl font-bold">₹</span>
            <NumericFormat
              value={product?.price}
              displayType="text"
              thousandSeparator=","
            />
          </p>
          <p className="text-gray-600 text-xl hover:text-red-600">
            <span className="hidden">Like</span>
            <RiHeart3Line />
          </p>
        </footer>
      </article>
    </NavLink>
  );
};
