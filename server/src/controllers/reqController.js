const pool = require("../db");

// POST /
module.exports.createRequest = async (req, res, next) => {
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
};

//GET all
module.exports.getRequest = async (req, res, next) => {
  try {
    const getAllReq = await pool.query("SELECT * FROM jotcReq");
    res.json(getAllReq.rows);
  } catch (err) {
    console.log(err);
  }
};

// GET /email/:emailId
module.exports.getByEmailId = async (req, res, next) => {
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
};

// GET /date/:date1/:date2
module.exports.getByDateRange = async (req, res, next) => {
  try {
    date1 = req.params.date1;
    date2 = req.params.date2;

    const getReqByDate = await pool.query(
      "SELECT * FROM jotcreq WHERE date>=$1 AND date<=$2",
      [date1, date2]
    );

    res.json(getReqByDate.rows);
  } catch (err) {
    console.log(err.messages);
  }
};
