import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full col-span-full m-auto h-full flex items-center justify-center">
      <p className="text-center p-10 font-bold  text-2xl rounded-md  bg-red-500 w-1/2 text-gray-50 h-fit">
        {error.message}
      </p>
    </div>
  );
};

export default Error;
