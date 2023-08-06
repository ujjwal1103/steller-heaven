import { useEffect } from "react";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, listAll, deleteObject } from "firebase/storage";
import { useState } from "react";
import Button from "../shared/button/Button";

const PhotoGalary = ({
  previewUrls,
  setPreviewUrls,
  setOpenGallary,
  setValue,
}) => {
  const [Images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const listRef = ref(storage, "images");

  const getAllList = async () => {
    try {
      const res = await listAll(listRef);
      const imagePromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { url, imageRef: itemRef };
      });
      const imageList = await Promise.all(imagePromises);
      setImages(imageList);

      // Set default selections for images already present in previewUrls
      const defaultSelections = imageList
        .filter((image) => previewUrls.includes(image.url))
        .map((image) => image.url);
      setSelectedImages(defaultSelections);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageClick = (url) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(url)) {
        // If the clicked image is already selected, remove it from the selection
        return prevSelectedImages.filter((image) => image !== url);
      } else {
        // If the clicked image is not selected, add it to the selection
        return [...prevSelectedImages, url];
      }
    });
  
    setPreviewUrls((prevPreviewUrls) => {
      if (prevPreviewUrls.includes(url)) {
        // If the clicked image is already in previewUrls, remove it from there too (unselect)
        return prevPreviewUrls.filter((imageUrl) => imageUrl !== url);
      } else {
        // If the clicked image is not in previewUrls, add it there (select)
        return [...prevPreviewUrls, url];
      }
    });
  };

  const handleSelectImages = () => {
    // Remove duplicates from selectedImages
    const uniqueSelectedImages = [...new Set(selectedImages)];

    // Merge the existing previewUrls and uniqueSelectedImages arrays while keeping the maximum length of 4
    const newPreviewUrls = [...previewUrls, ...uniqueSelectedImages].slice(
      0,
      4
    );
    console.log(newPreviewUrls);
    const un = [...new Set(newPreviewUrls)];
    console.log(un);
    setPreviewUrls(un);
    setValue("images", un);
    setOpenGallary(false);
  };
  useEffect(() => {
    getAllList();
  }, []);

  return (
    <div className=" w-full h-full p-10 pb-40 ">
      <div className="text-center text-2xl font-bold">
        <h1>Photo Gallary</h1>
        <h1>{Images?.length}</h1>
      </div>
      <div className="grid grid-cols-6 w-2/3 m-auto h-full overflow-y-scroll scrollbar-thin border my-3 p-6 gap-10 shadow-lg bg-gray-200">
        {Images?.map((img, index) => (
          <img
            onClick={() => handleImageClick(img.url)}
            src={img.url}
            alt={img.url}
            key={img.url + index}
            className={`w-32 h-32 object-contain text-center ${
              selectedImages.includes(img.url) ? "border-2 border-blue-500" : ""
            }`}
          />
        ))}
      </div>
      <div className="flex justify-end w-2/3 m-auto gap-5 ">
        <Button
          text={"select"}
          disabled={selectedImages.length === 0}
          onClick={handleSelectImages}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        />
        <Button
          text={"cancel"}
          // disabled={selectedImages.length === 0}
          onClick={() => setOpenGallary(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        />
      </div>
    </div>
  );
};

export default PhotoGalary;
