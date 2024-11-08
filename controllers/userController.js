const User = require("../models/userModel");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const isValidUser = await User.findOne({ email });

  if (isValidUser) {
    return next(errorHandler(400, "User already exist"));
  }

  const hasedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hasedPassword,
  });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        rest,
      });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser, loginUser, logoutUser };
