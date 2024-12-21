"use server";

import { responceTodoT } from "./types";

const url = process.env.BACKEND_URL;

export const getTodoData = async () => {
  const res = await fetch(`${url}/todos`, { next: { tags: ["todo-data"] } });
  if (!res.ok) {
    throw new Error("error");
  }
  const data: responceTodoT[] = await res.json();

  return data;
};
