import React, { useState } from "react";

const ProductColorSelector = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-4">
        {colors?.map((color) => (
          <button
            key={color.value}
            className={`w-8 h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-300 ${
              selectedColor === color.colorCode
                ? "border-blue-500 shadow-md"
                : ""
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => handleColorSelect(color.value)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
