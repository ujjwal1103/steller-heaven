import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CgSpinner } from "react-icons/cg";
const Button = ({
  text,
  icon, // Accept the "icon" prop from the parent
  onClick,
  disabled,
  className,
  type,
  isLoading,
  disabledStyles,
  style, // Accept the "style" prop from the parent
}) => {
  const classNames = clsx(className, { [disabledStyles]: disabled });

  return (
    <button
      type={type}
      className={classNames}
      onClick={!isLoading ? onClick : null}
      disabled={disabled}
      style={style} // Apply the custom styles from the parent
    >
      {isLoading ? (
        <>
          <CgSpinner className="animate-spin text-2xl w-16 rotate-[360deg]" />
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element, // Add prop type for icon
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "large"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  style: PropTypes.object,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  fullWidth: false,
  type: "button",
  isLoading: false,
  className: "border p-2",
  disabledStyles: "bg-opacity-50 cursor-not-allowed ",
};

export default Button;
