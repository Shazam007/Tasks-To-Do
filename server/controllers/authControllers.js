import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";

// 1) register controller
export const registerUser = async (req, res) => {
  const { email, firstName, lastName, password, retypePassword } =
    req.body.values;
  try {
    const encPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

// 2) user login controller with eamil and password
export const loginWithEmail = async (req, res) => {
  const { email, password } = req.body.values;

  const user = await UserModel.findOne({
    email: email,
  });
  if (!user) {
    return res.json({
      status: "error",
      error: "User not found, Please Register!",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    const token = jwt.sign(
      {
        name: user.firstName,
        email: user.email,
        userid: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error", error: "incorrect password" });
  }
};

// 3) user login controller with google
export const loginWithGoogle = async (req, res) => {
  const { userEmail } = req.body;

  const user = await UserModel.findOne({
    email: userEmail,
  });

  if (!user) {
    return res.json({
      status: "error",
      error: "User not found, Please Register!",
    });
  }
  if (user) {
    const token = jwt.sign(
      {
        name: user.firstName,
        email: user.email,
        userid: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({ status: "ok", user: token });
  }
};
