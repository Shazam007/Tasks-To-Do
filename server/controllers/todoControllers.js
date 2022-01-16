import jwt from "jsonwebtoken";
import TodoModel from "../models/todoModel.js";

//fetch todolist controller
export const fetchTodoList = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userid = decodedToken.userid;

    const todoList = await TodoModel.find({ userid: userid }).sort({ _id: -1 });

    res.json({ status: "ok", todoList: todoList });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//cerate todo controller
export const createTodo = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userid = decodedToken.userid;

    await TodoModel.create({
      todoText: req.body.todoText,
      status: "todo",
      userid: userid,
    }).then((data) => {
      res.json({ status: "ok", data: data });
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//delete todo controller
export const deleteTodo = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    TodoModel.findByIdAndRemove(req.params.id).then((data) => {
      res.json({ status: "ok", deletedTodo: data });
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//update todo text controller
export const updateTodoText = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const updatedTodoText = req.body.todoText;

    await TodoModel.findByIdAndUpdate(req.params.id, {
      $set: { todoText: updatedTodoText },
    }).then((data) => {
      res.status(200).json({
        status: "ok",
        updatedTodo: data,
      });
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//update todo status controller
export const updateTodoStatus = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const updatedTodoStatus = req.body.todoStatus;

    await TodoModel.findByIdAndUpdate(req.params.id, {
      $set: { status: updatedTodoStatus },
    }).then((data) => {
      res.status(200).json({
        status: "ok",
        updatedTodo: data,
      });
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};
