import ProductQuantity from "./ProductQuantity";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
const ProductCart = ({ cartProduct }) => {
  const dispatch = useDispatch();
  const { quantity, images, title, price } = cartProduct;
  const [qnt, setQnt] = useState(quantity);

  const removeProductFromCart = () => {
    dispatch(removeFromCart(cartProduct._id));
  };

  return (
    <div className="flex items-center p-6 border-b-2 gap-5">
      <div className="">
        <img src={images[2]} alt="img" className="w-24 h-24 object-contain" />
      </div>
      <p className="py-2 line-clamp-2 leading-7  overflow-hidden w-80">
        {title}
      </p>
      <div className="flex items-center gap-5 flex-1 justify-between w-full">
        <div className="py-4">
          <ProductQuantity
            quantity={qnt}
            setQuantity={setQnt}
            productId={cartProduct._id}
          />
        </div>
        <p className="py-2 text-xl font-bold">
          ₹
          <NumericFormat
            value={price * quantity}
            displayType="text"
            thousandSeparator=","
          />
        </p>
        <button
          onClick={removeProductFromCart}
          className="w-6 h-6 absolute lg:static right-0 top-0 flex items-center justify-center  text-red-500 transition-transform duration-300 ease-in-out transform hover:scale-125"
        >
          <AiOutlineDelete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
