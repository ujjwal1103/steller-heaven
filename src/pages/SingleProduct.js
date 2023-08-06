import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Info from "./../components/Info";
import { MdLocationOn } from "react-icons/md";
import ProductQuantity from "../components/ProductQuantity";
import ProductColorSelector from "../components/ProductColorSelector ";
import ProductSelector from "../components/ProductSelector";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ProductImagePreview from "../components/ProductImagePreview";
import { makeRequest } from "../api/makeRequest";
import ReviewAndRating from "../components/ReviewAndRating";
import { isValidIndianPincode } from "../utils/validations";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get(`product/${id}`);
        if (res.data.isSuccess) {
          setLoading(false);
          setProduct(res.data.product);
          setImages(res.data.product.images);
        }
      } catch (error) {
        setLoading(false);
        setError({
          error: true,
          errorMessage: error.message,
        });
      }
    };
    fetchProduct();
  }, [id]);

  const removeFromProductCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success("1 Item removed from cart", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  const addProductToCart = (p) => {
    dispatch(addToCart({ ...p, quantity }));
    toast.success("1 Item added to cart", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  const buyNow = (id) => {
    return null;
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };
  const checkPincode = () => {
    if (isValidIndianPincode(pincode)) {
      console.log(pincode);
    } else {
      alert("not valid pincode");
    }
  };

  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starComponents = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      starComponents.push(<FaStar key={`star-${i}`} />);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      starComponents.push(<FaStarHalfAlt key="star-half" />);
    }

    // Render empty stars to complete the rating
    while (starComponents.length < 5) {
      starComponents.push(
        <FaRegStar key={`star-empty-${starComponents.length}`} />
      );
    }

    return <div className="flex gap-1 items-center">{starComponents}</div>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center z-30 p-10 h-screen w-screen bg-gray-300 opacity-80 absolute top-0 backdrop-blur-sm">
        Loading...
      </div>
    );
  }
  if (error.error) {
    return (
      <div className="flex justify-center items-center z-30 p-10 h-screen w-screen bg-gray-300 opacity-80 backdrop-blur-sm">
        {error.errorMessage}
      </div>
    );
  }

  return (
    <div className="p-10  flex flex-col bg-gray-50 gap-10 min-h-screen scrollbar-thin">
      <div className=" flex flex-col lg:flex-row gap-10  ">
        <div className="flex flex-col gap-10 h-full">
          <div className="flex gap-5 lg:flex-row flex-col-reverse p-5 border">
            <div className="flex flex-wrap justify-center lg:flex-col gap-5">
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
            <div className="w-full h-full grid place-content-center">
              {images && (
                <img
                  src={images[index]}
                  alt=""
                  className="lg:w-80 w-44 h-52 object-contain"
                  onClick={() => setPreview(true)}
                />
              )}
            </div>
          </div>
          <div className="flex lg:gap-5 gap-2 font-bold text-xl">
            {cartProducts.some((item) => item._id === product._id) ? (
              <button
                className="p-5 border flex-1 bg-gray-400 text-gray-950"
                onClick={() => removeFromProductCart(product._id)}
              >
                Remove
              </button>
            ) : (
              <button
                className="p-5 border flex-1 bg-gray-400 text-gray-950"
                onClick={() => addProductToCart(product)}
              >
                Add to Cart
              </button>
            )}

            <button
              className="p-5 border flex-1 bg-slate-700 text-gray-100"
              onClick={() => buyNow(product._id)}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="lg:p-10 p-5 border flex-1 flex flex-col gap-5 ">
          <div className="font-bold text-2xl ">
            <span>{product?.title}</span>
          </div>
          <div className=" text-gray-800 font-xl">
            <span>{product?.brand}</span>
          </div>
          <div className="flex gap-5 lg:flex-row flex-wrap items-center ">
            <span className="font-bold text-3xl ">
              ₹
              <NumericFormat
                value={product?.price}
                displayType="text"
                thousandSeparator=","
              />
            </span>
            <span className="text-gray-600 line-through">
              ₹
              <NumericFormat
                value={product?.MRP}
                displayType="text"
                thousandSeparator=","
              />
            </span>
            <span className="font-bold text-xl text-green-600">
              {Math.floor(((product.MRP - product.price) / product.MRP) * 100)}%
              OFF
            </span>
          </div>
          <div>
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div>
            <ProductColorSelector colors={product.colors} />
          </div>
          <div>
            <ProductSelector category={product?.subCategory?.label} />
          </div>

          <Info title={"Warranty"}>1 year warranty</Info>
          <Info title={"Delivery"}>
            <div className="border-b-2 w-fit  lg:flex p-2 gap-2 items-center">
              {!isValidIndianPincode(pincode) ? (
                <>
                  <span className="text-gray-400">
                    <MdLocationOn />
                  </span>
                  <input
                    className=" outline-none"
                    type="number"
                    onClick={handlePincodeChange}
                  />
                  <span className="text-sky-800" onClick={checkPincode}>
                    Check
                  </span>{" "}
                </>
              ) : (
                <span className="text-sky-800">{pincode}</span>
              )}
            </div>
          </Info>
          <Info title={"Description"}>{product?.description}.</Info>
          <Info title={product?.reviews === 1 ? "Review" : "Reviews"}>
            <div className="flex gap-5 items-center ">
              <RatingStars rating={product?.rating} />
            </div>
          </Info>
        </div>
      </div>
      <ReviewAndRating productId={id} customerId />
      {preview && (
        <ProductImagePreview images={images} setPreview={setPreview} />
      )}
    </div>
  );
};

export default SingleProduct;
