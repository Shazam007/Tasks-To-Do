import mongoose from "mongoose";

const Todo = new mongoose.Schema(
  {
    todoText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  { collection: "todo" }
);

const TodoModel = mongoose.model("Todos", Todo);

export default TodoModel;
