const express = require("express");
const db = require("../models/user");
const {
  getAllUsersData,
  createNewUser,
  deleteUser,
  updateUserDetails,
  updateUser,
  validateCreateUser,
  userLogin,
  userSignUp,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getAllUsersData);

router.post("/createUser", validateCreateUser, createNewUser);

router.post("/deleteUser", deleteUser);

router.get("/update/:userId", updateUserDetails);

router.put("/update/:userId", updateUser);

router.post("/login", userLogin);

router.post("/signup", validateCreateUser, userSignUp);

module.exports = router;
