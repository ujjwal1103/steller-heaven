import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import ShowPassword from "../components/ShowPassword";
import { motion } from "framer-motion";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.config";

import { FcGoogle } from "react-icons/fc";
import { toastProps } from "../utils/tostProps";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "ujjwallade@gmail.com",
      password: "India@123",
    },
  });

  const mutation = useMutation(
    async (data) => {
      const response = await makeRequest.post("login", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        const payload = {
          user: data.user,
          token: data.token,
          isSuccess: data.isSuccess,
        };
        dispatch(setUser(payload));
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successfully", toastProps);

        navigate("/");
      },
      onError: (error) => {
        const errorMessage = error?.response?.data.message || error?.message;
        toast.error(errorMessage, toastProps);
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
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
      className="flex h-screen items-center justify-evenly overflow-hidden gap-10 flex-col lg:flex-row "
    >
      <form
        className="w-96 p-6 bg-gray-200 lg:shadow-lg rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

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

          <ShowPassword
            showPassword={showPassword}
            handleCheckboxChange={handleCheckboxChange}
            isPassword={!errors.password || watch("password")}
          />
        </div>

        <Button
          type={"submit"}
          text={"Login"}
          className="bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-2 px-4 rounded-md disabled:hover:bg-opacity-50 disabled:hover:bg-blue-500"
          isLoading={mutation.isLoading}
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
          dont have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
