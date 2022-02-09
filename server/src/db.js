const Pool = require("pg").Pool;
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config({ path: ".env" });

// const devConfig = {
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PWD,
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   database: process.env.DATABASE,
// };

// const prodConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: false, //heroku addons
// };

// const pool = new Pool(
//   process.env.NODE_ENV === "production" ? prodConfig : devConfig
// );

// pool
//   .connect()
//   .then(() => {
//     console.log("connected to pg");
//   })
//   .catch((err) => console.log(err));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;
