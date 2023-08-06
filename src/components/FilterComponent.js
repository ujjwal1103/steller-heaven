import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import { makeRequest } from "../api/makeRequest";
import { setBrands } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const FilterComponent = ({ subcategory, onFilter }) => {
  const { control, register, handleSubmit, watch, setError } = useForm({});
  const dispatch = useDispatch();
  const brands = useSelector(state=>state.filter.filter.brands)
  const onSubmit = (data) => {
    const { minPrice, maxPrice } = data;

    if (minPrice && maxPrice && minPrice > maxPrice) {
      setError("minPrice", {
        type: "invalid",
        message: "Minimum price cannot be greater than maximum price",
      });
      setError("maxPrice", {
        type: "invalid",
        message: "Maximum price cannot be less than minimum price",
      });
      return;
    }

    onFilter(data);
  };

  const fetchBrands = async () => {
    const res = await makeRequest.get(`brands/${subcategory}`);
    res.data.success && dispatch(setBrands(res.data.brands));
  };

  useEffect(()=>{
    if(subcategory){
      fetchBrands()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[subcategory])

  const brandController = useController({
    control,
    name: "brand",
    defaultValue: [],
  });

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  return (
    <div className="">
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label htmlFor="brand" className="block font-medium">
            Brand:
          </label>
          <Select
            id="brand"
            className="w-full mt-1"
            isMulti
            {...brandController.field}
            options={brands?.map((brand) => ({
              id: brand,
              label: brand,
              value: brand
            }))}
            formatOptionLabel={({ label }) => <div>{label.toUpperCase()}</div>}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="minPrice" className="block font-medium">
            Minimum Price:
          </label>
          <input
            type="number"
            id="minPrice"
            className="w-full p-2 mt-1 border rounded"
            {...register("minPrice")}
            min={0}
          />
          {maxPrice && minPrice && minPrice > maxPrice && (
            <span className="text-red-500 text-sm">
              Minimum price cannot be greater than maximum price
            </span>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="maxPrice" className="block font-medium">
            Maximum Price:
          </label>
          <input
            type="number"
            id="maxPrice"
            className="w-full p-2 mt-1 border rounded"
            {...register("maxPrice")}
            min={0}
          />
          {minPrice && maxPrice && maxPrice < minPrice && (
            <span className="text-red-500 text-sm">
              Maximum price cannot be less than minimum price
            </span>
          )}
        </div>

        <div className="mt-4">
          <label className="block font-medium">Customer Ratings:</label>
          <div>
            <input
              type="checkbox"
              id="aboveThree"
              className="mr-2"
              {...register("ratings")}
              value={3}
            />
            <label htmlFor="aboveThree">Above 3</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="aboveFour"
              className="mr-2"
              {...register("ratings")}
              value={4}
            />
            <label htmlFor="aboveFour">Above 4</label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;
