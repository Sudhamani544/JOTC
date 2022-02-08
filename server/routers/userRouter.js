const express = require("express");
const pool = require("../db");

const router = express.Router();

//create a request
router.post("/", async (req, res, next) => {
  try {
    const { email_id, first_name, last_name, date_of_birth, is_admin, pwd } =
      req.body;

    const findReq = await pool.query("SELECT * FROM users WHERE email_id=$1", [
      email_id,
    ]);

    if (findReq.rows.length === 0) {
      const createReq = await pool.query(
        "INSERT INTO users (email_id, first_name, last_name, date_of_birth, is_admin, pwd) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
        [email_id, first_name, last_name, date_of_birth, is_admin, pwd]
      );
      res.json(createReq.rows);
    } else {
      res.json("user is already present in the database");
    }
  } catch (err) {
    console.log(err.messages);
  }
});

//get all requests
router.get("/", async (req, res, next) => {
  try {
    const getAllReq = await pool.query("SELECT * FROM users");
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
      "SELECT * FROM users WHERE email_id=$1",
      [id]
    );
    res.json(getReqById.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

//get a request by lastname
router.get("/name/:lastname", async (req, res, next) => {
  try {
    id = req.params.lastname;
    const getReqByDate = await pool.query(
      "SELECT * FROM users WHERE last_name=$1",
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
    const delReqById = await pool.query("DELETE FROM users WHERE email_id=$1", [
      id,
    ]);
    res.json(delReqById.rows);
  } catch (err) {
    console.log(err.messages);
  }
});

module.exports = router;
