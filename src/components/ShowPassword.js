import React from 'react'

const ShowPassword = ({showPassword, isPassword, handleCheckboxChange}) => {
  return (
    <div className="flex justify-end p-2">
            <label className="cursor-pointer flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isPassword && showPassword}
                  onChange={handleCheckboxChange}
                  className="mr-2 border sr-only"
                />
                <div className="bg-white border-2 border-gray-400 rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                  {showPassword && (
                    <svg
                      className="fill-current w-4 h-4 text-blue-500 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="select-none">show password</div>
            </label>
          </div>
  )
}

export default ShowPassword