const client = require("../db");

// POST /
module.exports.createUser = async (req, res, next) => {
  try {
    const { email_id, first_name, last_name, date_of_birth, is_admin, pwd } =
      req.body;

    const findReq = await client.query(
      "SELECT * FROM users WHERE email_id=$1",
      [email_id]
    );

    if (findReq.rows.length === 0) {
      const createReq = await client.query(
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
};

//GET all
module.exports.getUser = async (req, res, next) => {
  try {
    const getAllReq = await client.query("SELECT * FROM users");
    res.json(getAllReq.rows);
  } catch (err) {
    console.log(err.messages);
  }
};

// GET /email/:emailId
module.exports.getByEmailId = async (req, res, next) => {
  try {
    id = req.params.emailId;
    const getReqById = await client.query(
      "SELECT * FROM users WHERE email_id=$1",
      [id]
    );
    res.json(getReqById.rows);
  } catch (err) {
    console.log(err.messages);
  }
};
