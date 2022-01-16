import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

//routers
app.use(authRoutes);
app.use(todoRoutes);

const uri = process.env.MONGODB_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 4000, () => {
  console.log("server started on port 4000");
});
