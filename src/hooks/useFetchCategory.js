import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/slices/categorySlice";
import { getSubCategories } from "../redux/slices/subCategorySlice";
import { makeRequest } from "../api/makeRequest";

const useFetchCategory = (id, categoryId) => {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOptions = async () => {
      const endPoint =
        id === "category" ? "categories" : `subcategories/${categoryId}`;
      try {
        const response = await makeRequest.get(`${endPoint}`);
        const data = response.data.options;
        const formattedOptions = data.map((item) => ({
          value: item._id,
          label: item.name,
          slug: item.slug,
        }));
        if (id === "category") {
          dispatch(getCategories(formattedOptions));
        } else {
          dispatch(getSubCategories(formattedOptions));
        }
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [id, dispatch, categoryId]);

  return options;
};

export default useFetchCategory;
