import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-24">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/20`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-black/80"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 text-left m-2"
              >
                Full Name:
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 text-left m-2"
              >
                Email:
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 text-left m-2"
              >
                Password:
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
