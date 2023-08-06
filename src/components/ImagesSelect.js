/* eslint-disable no-unused-vars */
import clsx from "clsx";
import React, { useState } from "react";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import PhotoGalary from "../pages/PhotoGalary";

const ImagesSelect = ({
  disabled,
  error,
  id,
  label,
  hidden,
  placeholder,
  register,
  setValue,
  clearErrors,
  previewUrls,
  setPreviewUrls,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [openGallary, setOpenGallary] = useState(false);
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const fileUrls = [];

    for (const file of files) {
      setLoading(true);
      const fileRef = ref(storage, `images/${file.name}`);
      const res = await uploadBytes(fileRef, file);
      if (res) {
        const url = await getDownloadURL(fileRef);
        fileUrls.push(url);
      }
    }

    setPreviewUrls((prevUrls) => [...prevUrls, ...fileUrls]);
    setValue(id, [...previewUrls, ...fileUrls]);
    setLoading(false);
    clearErrors(id);
  };

  const handleDelete = () => {
    setValue(id, []);
    setPreviewUrls([]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).slice(0, 4);
    const fileUrls = [];

    for (const file of files) {
      clearErrors(id);
      setLoading(true);
      const fileRef = ref(storage, `images/${file.name}`);
      const res = await uploadBytes(fileRef, file);
      if (res) {
        const url = await getDownloadURL(fileRef);
        fileUrls.push(url);
      }
    }

    setPreviewUrls((prevUrls) => [...prevUrls, ...fileUrls]);
    setValue(id, [...previewUrls, ...fileUrls]);
    setLoading(false);
  };

  const imageError = error && previewUrls.length === 0;

  const handleDeleteImage = (index) => {
    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
    setValue(id, newUrls);
  };

  return (
    <div className="flex flex-col p-5 flex-1">
      {previewUrls.length < 4 && (
        <div className="flex gap-5">
          <label
            htmlFor={id}
            className={clsx(
              "p-2 w-full flex-1  outline-none border-2 rounded-md focus:ring-2 focus:ring-green-500 text-gray-500 pl-2",
              {
                "ring-2 ring-gray-300": disabled,
                "ring-2 ring-red-500": error,
                "font-bold bg-gray-900 text-white": loading,
              }
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ borderColor: isDragging ? "green" : "" }}
          >
            {loading ? "Uploading Images..." : label}
          </label>

          <div
            className="p-2 border-2 rounded-md  cursor-pointer"
            onClick={() => setOpenGallary(true)}
          >
            <span className="">Gallary</span>
          </div>
        </div>
      )}

      <input
        type="file"
        id={id}
        {...register(id)}
        accept="image/*"
        multiple
        className={clsx(
          "p-2 w-full outline-none border-2 rounded-md focus:ring-2 focus:ring-green-500",
          {
            "ring-2 ring-gray-300": disabled,
            "ring-2 ring-red-400": imageError,
          }
        )}
        hidden={hidden}
        placeholder={placeholder}
        onChange={handleFileChange}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ borderColor: isDragging ? "green" : "" }}
      />

      {error && previewUrls.length === 0 && (
        <p className="py-3 text-red-600">{error?.message}</p>
      )}
      {previewUrls.length > 0 && (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-10 rounded-md border-2 mt-10">
          {/* <button className="col-span-full" onClick={() => handleDelete()}>
            Delete
          </button> */}
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="flex justify-center relative flex-col items-center"
            >
              <img
                key={url}
                src={url}
                alt="Preview"
                className="w-56 h-56 border-2 object-contain p-3 rounded-md"
              />
              <button
                className="p-3 text-gray-50 bg-red-500 hover:bg-red-700 rounded-full absolute -right-0 -top-5"
                onClick={() => handleDeleteImage(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {openGallary && (
        <div className="absolute inset-0 w-screen  overflow-hidden bg-gray-50">
          <PhotoGalary
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls}
            setOpenGallary={setOpenGallary}
            setValue={setValue}
          />
        </div>
      )}
    </div>
  );
};

export default ImagesSelect;
