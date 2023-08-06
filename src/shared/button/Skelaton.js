import React from "react";
import PropTypes from "prop-types";

const Skeleton = ({ width, height }) => {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div className="bg-gray-400 rounded-md animate-pulse" style={style}></div>
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Skeleton;
