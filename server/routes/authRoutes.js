import express from "express";
import {
  registerUser,
  loginWithEmail,
  loginWithGoogle,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginWithEmail);
router.post("/google/login", loginWithGoogle);

export default router;
