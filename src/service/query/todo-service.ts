"use server";

import { responceTodoT } from "./types";

const url =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-url.com"
    : "http://localhost:3600";

export const getTodoData = async () => {
  const res = await fetch(`${url}/todos`, { next: { tags: ["todo-data"] } });
  if (!res.ok) {
    throw new Error("error");
  }
  const data: responceTodoT[] = await res.json();

  return data;
};
