"use client";
import { addTodo } from "@/service/mutation/todo-mutation";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
};

export const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addTodo({
        id: 0,
        title: data.title,
        description: data.description,
      });
      reset({
        title: "",
        description: "",
      });
      console.log("Todo added:", data);
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg my-12">
      <h1 className="text-2xl font-semibold text-center mb-6">Create Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter todo name"
            {...register("title", { required: "Name is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter todo description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <button
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
