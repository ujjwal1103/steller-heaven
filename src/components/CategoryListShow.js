import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { makeRequest } from "../api/makeRequest";
import Accordion from "./Accordion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
const CategoryListShow = ({ title }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const queryClient = useQueryClient();
  const getProducts = async () => {
    try {
      const res = await makeRequest.get("categories");
      return res.data;
    } catch (error) {
      console.log("error", error.response.statusText);
    }
  };
  const query = useQuery({
    queryKey: ["category", "subcategory"],
    queryFn: getProducts,
    initialData: [],
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const end = data.type === "c" ? "category" : "subcategory";
      return await makeRequest.delete(`${end}/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", "subcategory"] });
    },
  });

  if (query.isLoading) {
    return <p>loading....</p>;
  }
  if (query.error) {
    return <p>{query.error?.response?.statusText}</p>;
  }

  const toggleAccordion = (accordionKey) => {
    setOpenAccordion((prevKey) =>
      prevKey === accordionKey ? null : accordionKey
    );
  };
  const handleDelete = (id) => {
    mutation.mutate({ type: "s", id: id });
  };

  return (
    <div className="   shadow-md flex  flex-col bg-slate-100 p-4">
      <h1 className="text-xl font-bold ">{title}</h1>
      <ul className=" ">
        <li className="font-semibold my-2">
          Total categories {query.data?.options?.length}
        </li>

        <AnimatePresence initial={false}>
          {query.data?.options?.map((cat) => (
            <Accordion
              title={cat.name}
              content={cat.subcategories}
              toggleAccordion={toggleAccordion}
              isOpen={openAccordion === cat._id}
              accordionKey={cat._id}
              key={cat._id}
              handleDelete={handleDelete}
            >
              <button
                onClick={() => mutation.mutate({ type: "c", id: cat._id })}
                className="flex items-center justify-center text-red-500 transition-transform duration-300 ease-in-out transform hover:scale-125"
              >
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </Accordion>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default CategoryListShow;
