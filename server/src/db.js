const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const devConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = pool;
