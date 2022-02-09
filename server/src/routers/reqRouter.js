const express = require("express");
const pool = require("../db");

const {
  createRequest,
  getByEmailId,
  getByDateRange,
  getRequest,
} = require("../controllers/reqController");
const router = express.Router();

//create a request
router.post("/", createRequest);

//get all requests
router.get("/", getRequest);

//get a request by email
router.get("/email/:emailId", getByEmailId);

//get a request by date range
router.get("/date/:date1/:date2", getByDateRange);

module.exports = router;
