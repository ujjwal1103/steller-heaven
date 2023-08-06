import React from "react";

const Info = ({ title, children }) => {
  return (
    <div className="text-justify flex lg:flex-row flex-col gap-5">
      <span className="font-semibold w-32">{title}</span>
      <span className="flex-1 flex items-center"> {children}</span>
    </div>
  );
};

export default Info;
