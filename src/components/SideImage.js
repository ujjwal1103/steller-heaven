import React from "react";
import login from "../assets/undraw_secure_login_pdn4.svg";
import register from "../assets/undraw_my_password_re_ydq7.svg";
import { motion } from "framer-motion";

const SideImage = ({ loginPage }) => {
  const farmerVariants = {
    left: { x: -200 },
    right: { x: 200 }, // Adjust this value based on how far you want the farmer to move
  };
  return (
    <motion.div
      initial="left"
      animate="right"
      transition={{
        delay: 1,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      }}
      variants={farmerVariants}
      className="w-1/3 p-5 -z-10 animate-pulse"
    >
      <img src={loginPage ? login : register} alt={"image"} />
    </motion.div>
  );
};

export default SideImage;
