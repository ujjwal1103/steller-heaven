import clsx from "clsx";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";

const Accordion = ({
  title,
  content,
  accordionKey,
  isOpen,
  toggleAccordion,
  children,
  handleDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <div
        className={`flex justify-between items-center px-6 py-3 border-b-4 border-gray-900 cursor-pointer ${
          isOpen ? "bg-blue-900" : ""
        }`}
        onClick={() => {
          content.length > 0 && toggleAccordion(accordionKey);
        }}
      >
        <h2
          className={clsx("text-lg  font-semibold", {
            "text-gray-50": isOpen,
          })}
        >
          {title}
        </h2>
        {children}
      </div>
      <div
        className={`p-6 bg-gray-100 ${
          isOpen ? "block border-b-4 border-gray-900" : "hidden"
        }`}
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          transition: "max-height 0.5s ease-out",
        }}
      >
        {content?.map((sub, index) => (
          <motion.h1  initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }} className="flex justify-between p-3" key={index}>
            <span>{sub?.name}</span>{" "}
            <button onClick={()=>handleDelete(sub?._id)} className="flex items-center justify-center text-red-500 transition-transform duration-300 ease-in-out transform hover:scale-125">
              <AiOutlineDelete className="w-5 h-5" />
            </button>
          </motion.h1>
        ))}
      </div>
    </motion.div>
  );
};

export default Accordion;
