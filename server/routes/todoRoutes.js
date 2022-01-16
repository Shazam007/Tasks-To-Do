import express from "express";

import {
  fetchTodoList,
  createTodo,
  deleteTodo,
  updateTodoText,
  updateTodoStatus,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/todos", fetchTodoList);
router.post("/todo", createTodo);
router.delete("/todo/:id", deleteTodo);
router.post("/todo/:id", updateTodoText);
router.post("/todo/status/:id", updateTodoStatus);

export default router;
