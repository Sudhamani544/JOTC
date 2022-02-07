const express = require("express");
const pool = require("../db");

const router = express.Router();

//create a request
router.post("/", async (req, res, next) => {
  try {
    const { email_id, inp_len, pattern, output } = req.body;
    const createReq = await pool.query(
      "INSERT INTO jotcReq (email_id, inp_len, pattern, output) VALUES($1,$2,$3,$4) RETURNING *",
      [email_id, inp_len, pattern, output]
    );
    res.json(createReq.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

//get all requests
router.get("/", async (req, res, next) => {
  try {
    const getAllReq = await pool.query("SELECT * FROM jotcReq");
    res.json(getAllReq.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

//get a request by email
router.get("/email/:emailId", async (req, res, next) => {
  try {
    id = req.params.emailId;
    const getReqById = await pool.query(
      "SELECT * FROM jotcReq WHERE email_id=$1",
      [id]
    );
    res.json(getReqById.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

//get a request by date
router.get("/date/:date", async (req, res, next) => {
  try {
    id = req.params.date;
    const getReqByDate = await pool.query(
      "SELECT * FROM jotcReq WHERE date=$1",
      [id]
    );
    res.json(getReqByDate.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

//delete by email id
router.delete("/:emailId", async (req, res, next) => {
  try {
    id = req.params.emailId;
    const delReqById = await pool.query("DELETE FROM user WHERE email=$1", [
      id,
    ]);
    res.json(delReqById.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

module.exports = router;
