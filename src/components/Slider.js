import React, { useCallback, useEffect, useState } from "react";
import forward from "../arrow-back-left-svgrepo-com.svg";
import backword from "../arrow-forward-navigation-svgrepo-com.svg";
import resume from "../assets/play-buttton.png";
import pause from "../assets/pause.png";
import { useDispatch } from "react-redux";
import { getImages } from "../redux/slices/SliderSlice";
import { makeRequest } from "../api/makeRequest";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [isStoped, setIsStoped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const images = JSON.parse(localStorage.getItem("images")) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await makeRequest.get("sliderImages");
        if (res.data.isSuccess) {
          dispatch(getImages(res.data.sliderImages));
          localStorage.setItem("images", JSON.stringify(res.data.sliderImages));
        } else {
          setError("Failed to fetch images");
        }
      } catch (err) {
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [dispatch]);

  const setSlider = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    const interval = !isStoped ? setInterval(setSlider, 2000) : null;
    return () => {
      clearInterval(interval);
    };
  }, [isStoped, setSlider]);

  const arrowHandler = (arrow) => {
    if (arrow === "LEFT") {
      setIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
    if (arrow === "RIGHT") {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
    if (arrow === "PAUSE") {
      setIsStoped(!isStoped);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && images.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full relative flex-col ">
      <img
        src={images[index]?.imageUrl}
        alt=""
        className="w-full lg:h-96 transition-all duration-700 object-fit"
      />

      <div
        className="absolute left-0 top-1/2  transform -translate-y-1/2  bg-gray-200 hover:opacity-100 opacity-0"
        onClick={() => arrowHandler("LEFT")}
      >
        <span className="py-10">
          <img src={forward} className="w-10 py-10 " alt="" />
        </span>
      </div>
      <div
        className="absolute top-1/2  left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-opacity-50 bg-gray-100 rounded-full w-16 h-16 flex justify-center items-center transition-opacity duration-700 ease-in-out hover:opacity-100 opacity-0"
        onClick={() => arrowHandler("PAUSE")}
      >
        <span className="">
          <img src={isStoped ? resume : pause} className="w-6 py-6 " alt="" />
        </span>
      </div>
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200  hover:opacity-100 opacity-0"
        onClick={() => arrowHandler("RIGHT")}
      >
        <span className="py-10">
          <img src={backword} className="w-10 py-10 " alt="" />
        </span>
      </div>
      <div className="absolute bottom-0 flex gap-5 justify-center items-center w-full p-4">
        {images?.map((_, ind) => (
          <span
            key={ind}
            className={`w-5 h-5 bg-gray-500 rounded-full border-2 ${
              index === ind ? "w-5 h-5 bg-slate-950" : ""
            }`}
            onClick={() => setIndex(ind)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
