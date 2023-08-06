import { useState } from "react";
import { FaTimes } from "react-icons/fa";
const ProductImagePreview = ({ images, setPreview }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="fixed top-0 left-0 w-screen z-50 h-screen overflow-hidden  flex justify-center items-center backdrop-blur-sm bg-opacity-50 bg-gray-950">
      <div className="w-1/2  bg-white shadow-lg border relative">
        <div className="flex justify-end p-10 text-xl bg-gray-50 absolute -right-28 -top-28">
          <button onClick={() => setPreview(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="flex gap-2 justify-between  p-10">
          <div className="grid grid-cols-2 place-content-center gap-5">
            {images?.map((img, ind) => (
              <img
                src={img}
                alt=""
                key={img}
                className="lg:w-24 w-16 aspect-square border object-contain "
                onClick={() => setIndex(ind)}
              />
            ))}
          </div>
          <div className="w-[600px] h-[450px] grid place-content-center">
            {images && (
              <img src={images[index]} alt="" className=" object-contain" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagePreview;
