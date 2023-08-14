import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const mutation = useMutation(
    async (data) => {
      const response = await makeRequest.post("register", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.user?.isGoogleLogin) {
          localStorage.setItem("token", data.token);
          const payload = {
            user: data.user,
            token: data.token,
            isSuccess: data.isSuccess,
          };
          console.log(payload);
          dispatch(setUser(payload));
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Login successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
          });
          navigate("/");
        } else {
          toast.success("registration successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
          });
          navigate("/login");
        }
      },
      onError: (error) => {
        const errorMessage = error?.response?.data.message || error?.message;
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
      },
    }
  );

  const onSubmit = (data) => {
    const { confirmPassword, ...rest } = data;
    mutation.mutate(rest);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        console.log(user);
        const data = {
          email: user.email,
          name: user?.displayName,
          accessToken: user.accessToken,
          isGoogleLogin: true,
          password: "ujwallade",
          dp: user.photoURL,
          uid: user.uid,
        };
        mutation.mutate(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ x: "-50vw", y: 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex h-screen items-center justify-evenly  gap-10 flex-col lg:flex-row"
    >
      <form
        className="w-96 p-6 bg-gray-100 lg:shadow-lg rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6">Registration</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            className={`border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === document.getElementById("password").value ||
                "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          <div className="flex justify-end p-2">
            <label className="cursor-pointer flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showPassword}
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
        </div>
        {/* <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Register
        </button> */}
        <Button
          type={"submit"}
          text={"Register"}
          className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md "
          isLoading={mutation.isLoading}
          disabledStyles={
            "bg-opacity-50 pointer-events-none cursor-not-allowed"
          }
          disabled={mutation.isLoading || !isValid}
        />
        <div>
          <Button
            text={"Sign In with google"}
            icon={<FcGoogle />}
            className={
              "bg-gray-50 p-2 flex gap-3 justify-center items-center w-full border rounded-md my-4"
            }
            onClick={handleGoogleSignin}
          />
        </div>
        <p className="py-2">
          dont have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </motion.div>
  );
};

export default Register;
