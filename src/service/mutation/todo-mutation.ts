"use server";
const url = process.env.BACKEND_URL;
import { revalidateTag } from "next/cache";
import { responceTodoT } from "./types";

export const deleteTodo = async (id: number | string) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text(); // Log the HTML or error response
    console.error("Error response:", errorText);
    throw new Error(`Request failed with status ${res.status}`);
  }

  try {
    const data = await res.json(); // Only parse as JSON if the response is valid
    console.log(data);
  } catch (error) {
    console.error("Failed to parse response as JSON", error);
  }
};
export const addTodo = async (todo: responceTodoT) => {
  const res = await fetch(`${url}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Error");
  }
  revalidateTag("todo-data");
};

export const updateTodo = async (id: number | string, todo: responceTodoT) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Error");
  }
  revalidateTag("todo-data");
};
