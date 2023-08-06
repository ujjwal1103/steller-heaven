import React, { useEffect, useState } from "react";

import TopCategory from "../components/TopCategory";
import cat from "../assets/mobile_accessories.jpg";
import Footer from "../components/Footer";

import { ProductBox } from "../components/productBox";

import useFetchData from "../hooks/useFetchData";
import { Link, useRoutes } from "react-router-dom";
import { makeRequest } from "../api/makeRequest";

const Home = () => {
  // const getProducts = async () => {
  //   try {
  //     const res = await makeRequest.get("products");
  //     return res.data;
  //   } catch (error) {
  //     console.log("error", error.response.statusText);
  //   }
  // };
  // const query = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  //   initialData: [],
  // });

  // if (query.isLoading) {
  //   return <p>loading....</p>;
  // }
  // if (query.error) {
  //   return <p>{query.error?.response?.statusText}</p>;
  // }

  const { error, loading, products } = useFetchData();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCatgories = async () => {
      const { data } = await makeRequest.get("subcategories");
      setCategories(data.options.slice(0, 7));
    };
    getCatgories();
  }, []);

  return (
    <div className="w-full scrollbar-none">
      <div className="p-5 w-full ">
        <TopCategory
          title={"Shop deals in top categories"}
          viewAll={"Explore all categories"}
          path={"/products"}
        >
          {categories?.map((item) => (
            <Link
              to={`/products?subcategory=${item._id}`}
              key={item._id}
              className="inline-block  h-64 mx-2"
            >
              <img
                src={cat}
                alt={cat}
                className="w-full h-full object-contain "
              />
              <span className="font-semibold text-xl text-center w-full block">
                {item.name}
              </span>
            </Link>
          ))}
        </TopCategory>
      </div>
      <div className="p-5 w-full">
        <TopCategory title={"Top Deals"} viewAll={"See all offers"}>
          {products?.slice(2, 8)?.map((item) => (
            <ProductBox product={item} key={item._id} />
          ))}
        </TopCategory>
      </div>
      <div className="p-5 w-full">
        <TopCategory
          title={"50% - 80% off | Clothing, footwear, beauty & more"}
          viewAll={"See all offers"}
        >
          {products?.slice(0, 5)?.map((item) => (
            <ProductBox product={item} key={item._id} />
          ))}
        </TopCategory>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
