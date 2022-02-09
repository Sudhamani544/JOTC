const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const pool = require("./db");
const reqRouter = require("./routers/reqRouter");
const userRouter = require("./routers/userRouter");

dotenv.config({ path: ".env" });
const app = express();

app.set("port", process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/requests", reqRouter);
app.use("/api/v1/user", userRouter);

app.listen(app.get("port"), () => {
  console.log("server running at http://localhost:%d/api/v1", app.get("port"));
});
