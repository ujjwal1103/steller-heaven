import React, {  useState } from "react";
import CategoryListShow from "../components/CategoryListShow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import useFetchCategory from "../hooks/useFetchCategory";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import { socket } from "../socket";

const AddSubcategoryForm = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("category");
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const options = useFetchCategory("category");

  const addSubcategoryMutation = useMutation(
    async (subcategory) => {
      const apiUrl =
        selectedOption === "category" ? "categories" : "subcategories";

      const response = await makeRequest.post(apiUrl, {
        name: subcategory,
        ...(selectedValue && { category: selectedValue.value }),
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        socket.emit("getNotification", {
          notificationMessage: `${data.category.name} added to categories`,
          data: data.category
        });
        setName("");
        setError("");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["c"] });
        queryClient.invalidateQueries({ queryKey: ["s"] });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError(`${selectedOption} name cannot be empty`);
      return;
    }
    if (!selectedValue && selectedOption === "subcategory") {
      setError(`category is required`);
      return;
    }

    const nameRegex = /^[A-Za-z\s\-'.,!?]+$/;
    if (!nameRegex.test(name)) {
      setError(`${selectedOption} name can only contain alphabetic characters`);
      return;
    }

    addSubcategoryMutation.mutate(name);
  };

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedValue(selectedOption);
  };
  return (
    <div className="flex-1 bg-gray-50 overflow-hidden ">
      {open && (
        <form
          onSubmit={handleSubmit}
          className="w-screen  absolute backdrop-blur-sm bg-gray-900 bg-opacity-50 inset-0 flex justify-center items-center"
        >
          <div className="bg-gray-50  p-10 shadow-lg border rounded-lg">
            <div className="mb-4 flex gap-4 py-4 bg-gray-50">
              <label
                className={
                  selectedOption !== "category"
                    ? "p-3 border rounded-md"
                    : "p-3 border rounded-md ring ring-blue-500"
                }
                htmlFor="category"
              >
                <input
                  hidden
                  type="radio"
                  value="category"
                  id="category"
                  checked={selectedOption === "category"}
                  onChange={() => {
                    setSelectedOption("category");
                    setError("");
                    setName("");
                  }}
                />
                Category
              </label>
              <label
                className={
                  selectedOption !== "subcategory"
                    ? "p-3 border rounded-md"
                    : "p-3 border rounded-md ring ring-blue-500"
                }
                htmlFor="subcategory"
              >
                <input
                  hidden
                  id="subcategory"
                  type="radio"
                  value="subcategory"
                  checked={selectedOption === "subcategory"}
                  onChange={() => {
                    setSelectedOption("subcategory");
                    setError("");
                    setName("");
                  }}
                />
                Subcategory
              </label>
            </div>

            {selectedOption === "subcategory" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  {/* {selectedOption.toUpperCase()} NAME */}
                  NAME
                </label>
                <Select
                  options={options}
                  value={selectedValue}
                  onChange={handleSelectChange}
                  closeMenuOnSelect
                  isClearable
                />
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {selectedOption.toUpperCase()} NAME
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Enter ${selectedOption} name`}
                value={name}
                onChange={(e) => {
                  setError("");
                  setName(e.target.value);
                }}
              />
              {error && (
                <p className="text-red-500 text-xs italic py-2">{error}</p>
              )}
            </div>
            {addSubcategoryMutation.error && (
                <p className="text-red-500 text-xs italic py-2">{addSubcategoryMutation.error.response.data.error}</p>
            )}

            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add {selectedOption}
              </button>
              <Button
                text={"cancel"}
                className={
                  "border py-2 px-4 rounded-md bg-gray-700 text-white hover:bg-gray-900"
                }
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </form>
      )}
      <div className="grid lg:grid-cols-1 gap-10 lg:p-10 pt-5 h-full pb-40 overflow-y-scroll lg:scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-400">
        <Button
          text={"Add New Category"}
          className={
            "border w-1/3 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          }
          onClick={() => setOpen(true)}
        />
        <CategoryListShow title={"List of categories"} />
      </div>
    </div>
  );
};

export default AddSubcategoryForm;
