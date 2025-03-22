const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoute=require("./Routes/auth-router")
require("dotenv").config();
//mongodb connection
require("./Model/db");

const port = process.env.PORT;
//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("hello world");
});

//routes handler
app.use("/api/auth",authRoute)
app.listen(port, () => {
  console.log(`server is running on port ${port} number`);
});
