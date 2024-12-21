"use server";
const url = process.env.BACKEND_URL;
import { revalidateTag } from "next/cache";
import { responceTodoT } from "./types";

export const deleteTodo = async (id: number | string) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error");
  }
  revalidateTag("todo-data");

  const data = await res.json();

  return data;
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
