import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";

const MyForm = ({ product }) => {
  const { register, handleSubmit } = useForm();
  const [previewImages, setPreviewImages] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
  };

  // Replace the options with data from your BE API
  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
  ];

  // Replace the options with data from your BE API
  const subCategoryOptions = [
    { value: "subcategory1", label: "Subcategory 1" },
    { value: "subcategory2", label: "Subcategory 2" },
    { value: "subcategory3", label: "Subcategory 3" },
  ];

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreviewImages(imagePreviews);
  };

  const CategoryController = useController({
    name: "category",
    control: register(),
    defaultValue: categoryOptions[0], // Preselect the first option
  });

  const SubcategoryController = useController({
    name: "subcategory",
    control: register(),
    defaultValue: product?.category,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Category</label>
        <Select
          options={categoryOptions}
          {...CategoryController.field}
          onChange={(value) => CategoryController.field.onChange(value)}
        />
      </div>

      <div>
        <label>Subcategory</label>
        <Select
          options={subCategoryOptions}
          {...SubcategoryController.field}
          onChange={(value) => SubcategoryController.field.onChange(value)}
        />
      </div>

      <div>
        <label>Product Title</label>
        <input type="text" {...register("productTitle", { required: true })} />
      </div>

      <div>
        <label>Images</label>
        <input
          type="file"
          name="images"
          multiple
          {...register("images")}
          onChange={handleImageChange}
        />
        <div>
          {previewImages.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index + 1}`} />
          ))}
        </div>
      </div>

      <div>
        <label>Price</label>
        <input type="number" {...register("price")} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
