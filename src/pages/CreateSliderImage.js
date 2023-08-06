import React, { useState } from "react";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RiImageAddLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import SliderImages from "../components/SliderImages";
import { addImage } from "../redux/slices/SliderSlice";
import { useDispatch } from "react-redux";
import { makeRequest } from "../api/makeRequest";

const CreateSliderImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const fileRef = ref(storage, `sliderImages/${file.name}`);
      const res = await uploadBytes(fileRef, file);
      if (res) {
        const downloadUrl = await getDownloadURL(fileRef);
        setImageUrl(downloadUrl);
        setErrorMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while uploading the image");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDelete = () => {
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setErrorMessage("Please upload an image");
      return;
    }

    try {
      const response = await makeRequest.post("sliderImages", { imageUrl });
      if (response.data.isSuccess) {
        // Image created successfully
        dispatch(addImage(response.data.image));
        alert(response.data.message);
        // Reset the form
        setImageUrl("");
        setErrorMessage("");
      } else {
        // Error occurred while creating image
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col flex-1 bg-gray-50 overflow-hidden">
      <div className="p-8 w-[500px] bg-gray-100 m-6">
        <h2 className="text-xl font-bold mb-4 ">Create Slider Image</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-dashed border-2 border-gray-300 p-8 mb-4 w-full lg:h-96 flex justify-center items-center flex-col"
        >
          {!imageUrl && (
            <label htmlFor="fileInput" className="mb-4 cursor-pointer">
              <div className="flex items-center">
                <RiImageAddLine className="mr-2" size={20} />
                <span className="text-lg">
                  Drag and drop or click to upload an image
                </span>
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          )}
          {uploading && (
            <p className="flex items-center">
              <AiOutlineLoading className="animate-spin mr-2" size={20} />
              Uploading...
            </p>
          )}
          {imageUrl && (
            <div className="flex flex-col items-center">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="my-4 w-96 h-44 object-contain "
              />
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={uploading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Create
        </button>
      </div>
      <SliderImages />
    </div>
  );
};

export default CreateSliderImage;
