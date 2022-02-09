const express = require("express");
const pool = require("../db");

const {
  createUser,
  getUser,
  getByEmailId,
} = require("../controllers/userController");
const router = express.Router();

//create a user
router.post("/", createUser);

//get all users
router.get("/", getUser);

//get a request by email
router.get("/email/:emailId", getByEmailId);

module.exports = router;
