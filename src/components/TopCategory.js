import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";

const TopCategory = ({ title, viewAll, children, path }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollTo({
      left: scrollContainerRef.current.scrollLeft - 600, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollTo({
      left: scrollContainerRef.current.scrollLeft + 600, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  return (
    <div className=" bg-slate-50 p-2 rounded-md shadow-md shadow-gray-500 overflow-hidden">
      <div className="flex justify-between items-center max-h-32 px-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          to={path}
          className="text-sky-400 hover:underline underline-offset-4"
        >
          {viewAll}
        </Link>
      </div>
      <div className="relative  py-4">
        <div
          ref={scrollContainerRef}
          className="scrollbar-none p-3 w-full h-full mx-auto overflow-x-scroll whitespace-nowrap  "
        >
          {children}
        </div>
        <div className="absolute top-0 left-0 items-center flex h-full">
          <button
            onClick={scrollLeft}
            className="text-4xl h-28  opacity-0 hover:bg-gray-300 hover:opacity-100"
          >
            <BiSolidChevronLeft />
          </button>
        </div>
        <div className="absolute flex  h-full items-center top-0 right-0">
          <button
            className="text-4xl h-28 opacity-0 hover:bg-gray-300 hover:opacity-100"
            onClick={scrollRight}
          >
            <BiSolidChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

TopCategory.defaultProps = {
  title: "Shop deals in top categories",
};

export default TopCategory;
