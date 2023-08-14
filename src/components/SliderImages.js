import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { makeRequest } from "../api/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SliderImages = () => {
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState(null);

  const getImages = async () => {
    try {
      const res = await makeRequest.get("sliderImages");
      return res.data;
    } catch (error) {
      console.log("error", error.response.statusText);
    }
  };
  const { data, error } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    initialData: [],
  });
  const deleteImageMutation = useMutation({
    mutationFn: async (id) => {
      return await makeRequest.delete(`sliderImages/${id}`);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const deleteImage = async (id) => {
    deleteImageMutation.mutate(id);
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="p-8 flex-1 overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Slider Images</h2>
      {error && <p>{error}</p>}
      <ul className="flex flex-col gap-8">
        {data?.sliderImages?.map((image) => (
          <li key={image._id} className="flex w-full justify-center relative">
            <img
              src={image.imageUrl}
              alt=""
              className="w-full h-96"
              onClick={() => handlePreview(image.imageUrl)}
            />
            <button
              onClick={() => deleteImage(image._id)}
              className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center text-white items-center text-2xl h-12 w-12 hover:bg-red-600 hover:bg-opacity-30 hover:opacity-100"
            >
              <RiDeleteBin2Fill />
            </button>
          </li>
        ))}
      </ul>
      {previewImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="w-full ">
            <div className=" ">
              <img
                src={previewImage}
                alt="Preview"
                className="block p-20 w-full h-full"
              />
            </div>
          </div>

          <div className="absolute w-screen h-screen ">
            <button
              onClick={closePreview}
              className="absolute top-0 right-0 w-full text-white text-xl z-50 bg-red-600 p-5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderImages;
