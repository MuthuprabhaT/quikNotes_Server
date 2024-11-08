const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");

router.post("/signup", signupUser);
router.post("/signin", loginUser);
router.get("/signout", verifyToken, logoutUser);

module.exports = router;
