import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/slices/productSlice";
import { makeRequest } from "../api/makeRequest";

const useFetchData = (filter, sort, search = "") => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      let res;

      // Check if filter or sort are provided and not empty objects
      if (
        (filter && Object.keys(filter).length !== 0) ||
        (sort && Object.keys(sort).length !== 0)
      ) {
        res = await makeRequest.post(`products/filter${search}`, {
          ...filter,
          sort,
        });
      } else {
        res = await makeRequest.get(`products${search}`);
      }

      if (res.data.isSuccess) {
        // Check if the response contains products data
        const products = res.data.products || [];
        dispatch(
          getProducts({
            data: products,
            total: res.data.totalProduct,
          })
        );
        return products;
      } else {
        throw new Error("API response indicates failure.");
      }
    } catch (error) {
      // Handle errors here, e.g., show an error message or log the error.
      console.error("Error fetching products:", error);
      throw error; // Rethrow the error to propagate it to the useQuery hook.
    }
  };

  const { data: products, error, isLoading: loading } = useQuery(
    ["products", sort, filter, search],
    fetchData
  );

  // Check for loading state and return empty products array if still loading
  const productsData = loading ? [] : products || [];

  return { error, loading, products: productsData };
};

export default useFetchData;
