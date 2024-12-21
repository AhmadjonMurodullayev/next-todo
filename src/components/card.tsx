"use client";
import React, { useState } from "react";
import { deleteTodo } from "@/service/mutation/todo-mutation";
import { updateTodo } from "@/service/mutation/todo-mutation";

export const Card = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = async () => {
    setIsLoading(true);
    try {
      const res = await deleteTodo(id);
    } catch (error) {
      console.error("Error deleting todo", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = () => {
    const newTitle = prompt("Enter new title:", title);
    const newDescription = prompt("Enter new description:", description);

    if (newTitle && newDescription) {
      try {
        updateTodo(id, {
          id: id,
          title: newTitle,
          description: newDescription,
        });
      } catch (error) {
        console.error("Error updating todo", error);
      }
    } else {
      alert("You must enter both title and description to update.");
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-md mb-4">
      <h1 className="text-2xl font-semibold text-blue-400">{title}</h1>
      <p className="text-gray-600">{description}</p>

      <button
        disabled={isLoading}
        onClick={deleteData}
        className={`p-2 mt-4 text-white rounded-md ${
          isLoading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {isLoading ? "Loading..." : "Delete"}
      </button>

      <button
        onClick={updateData}
        className="p-2 mt-4 ml-4 text-white rounded-md bg-blue-500 hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
};
