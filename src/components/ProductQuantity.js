import { BsDash, BsPlus } from 'react-icons/bs';

import { useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/slices/cartSlice.js';

const ProductQuantity = ({ quantity, setQuantity, productId }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="flex items-center">
     {quantity > 1 && <button
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
        onClick={handleDecrement}
      >
        <BsDash size={16} />
      </button>}
      <span className="px-4 py-1 bg-gray-100">{quantity}</span>
      <button
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
        onClick={handleIncrement}
      >
        <BsPlus size={16} />
      </button>
    </div>
  );
};

export default ProductQuantity;
