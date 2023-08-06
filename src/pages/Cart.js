import { useSelector } from "react-redux";
import { TbShoppingCartOff } from "react-icons/tb";
import ProductCart from "../components/ProductCart";
import { NavLink } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Skeleton from "./../shared/button/Skelaton";

const Cart = () => {
  const { cartProducts, totalProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  if (cartProducts.length === 0) {
    return (
      <div
        className="w-screen flex justify-center items-center flex-col"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <span className="text-2xl  text-center font-bold gap-4 flex justify-center items-center">
          You don't have any items in your cart{" "}
          <TbShoppingCartOff className="font-bold" />
        </span>
        <NavLink to="/">
          <span>Start Shopping</span>

          <Skeleton width={"100px"} height={"10px"} />
        </NavLink>
      </div>
    );
  }

  return (
    <div
      className="w-screen lg:p-10 p-5 flex lg:flex-row flex-col gap-10"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="p-4 shadow-md flex flex-col rounded-md border flex-1 overflow-y-scroll scrollbar-thin m-4 scrollbar-rounded-lg scrollbar-thumb-zinc-700 ">
        {cartProducts?.map((cart) => (
          <ProductCart cartProduct={cart} key={cart._id} />
        ))}
      </div>
      <div className="lg:w-[500px] h-full  p-4 shadow-md flex justify-end flex-col rounded-md border">
        <h1 className="font-bold text-2xl"> Cart Summary</h1>
        <h3 className="font-semibold py-3">
          Price Details (
          {totalProducts === 1
            ? `${totalProducts} item`
            : `${totalProducts} items`}
          )
        </h3>
        <div className="flex-1">
          <span>Total Amount</span>
          <span>
            ₹{" "}
            <NumericFormat
              value={totalAmount}
              displayType="text"
              thousandSeparator=","
            />
          </span>
        </div>
        <div className="flex flex-col w-full gap-4  self-end">
          <button className="p-2 bg-gray-600 text-gray-100 rounded-md">
            Checkout Now
          </button>
          <NavLink
            to={`/`}
            className="p-2 bg-gray-200 text-center text-gray-700 rounded-md"
          >
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
