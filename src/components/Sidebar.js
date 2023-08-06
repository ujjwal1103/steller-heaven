import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../api/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategoryId } from "../redux/slices/filterSlice";

const Sidebar = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { subCategoryId } = useSelector((state) => state.filter.filter);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const subcategory = searchParams.get("subcategory");
    dispatch(setSubCategoryId(subcategory));
  }, [dispatch, search]);

  const getCategories = async () => {
    try {
      const res = await makeRequest.get("categories");
      return res.data;
    } catch (error) {
      console.log("error", error.response.statusText);
    }
  };

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    initialData: [],
  });
  const handleFilter = (filterData) => {
    const result = {};
    for (let key in filterData) {
      if (
        filterData[key] !== null &&
        filterData[key] !== "" &&
        filterData[key].length !== 0 &&
        filterData[key]
      ) {
        if (Array.isArray(filterData[key])) {
          result[key] = filterData[key].map((item) => item.value || item);
        } else {
          result[key] = filterData[key];
        }
      }
    }
    console.log(result);

    if (Object.keys(result).length === 0) {
      return;
    }

    navigate(pathname, { state: { ...result } });
  };
  const handleCategoryClick = (categoryId) => {
    if (openSubcategory === categoryId) {
      setOpenSubcategory(null);
    } else {
      setOpenSubcategory(categoryId);
    }
  };

  return (
    <div className="scrollbar-thin  scrollbar-rounded  overflow-y-scroll scroll-smooth bg-gray-300 p-4 h-screen md:hidden sm:hidden hidden lg:block w-64 pb-40">
      <span className="font-bold text-xl ">Category</span>
      <ul className="pt-3">
        {data?.options?.map((cat) => {
          const hasSubcategories = cat?.subcategories?.length > 0;
          const isOpen = openSubcategory === cat._id;
          return (
            <li key={cat._id} className="pl-3">
              <div
                className={`py-2 flexcursor-pointer justify-between  w-full items-center ${
                  hasSubcategories ? "select-none" : ""
                }`}
                onClick={() => {
                  if (hasSubcategories) {
                    handleCategoryClick(cat._id);
                  }
                }}
              >
                <span className="font-semibold ">{cat.name}</span>
              </div>
              {isOpen && (
                <ul>
                  {cat?.subcategories?.map((subCat) => (
                    <li key={subCat._id}>
                      <NavLink
                        to={`?subcategory=${subCat._id}`}
                        className={`text-gray-700 pl-6 cursor-pointer ${
                          subCategoryId === subCat._id
                            ? "text-red-600 font-semibold"
                            : ""
                        }`}
                        onClick={() => dispatch(setSubCategoryId(subCat._id))}
                      >
                        {subCat.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {(subCategoryId || search) && (
        <>
          <span className="font-bold text-xl ">Filters</span>
          <FilterComponent
            subcategory={subCategoryId}
            onFilter={handleFilter}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
