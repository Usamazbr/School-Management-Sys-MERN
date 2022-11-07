const express = require("express");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const stuRoute = require("./routes/sturoute");

const cors = require("cors");

const app = express();

// middleware funcs
app.use(express.json());
app.use(cors({}));

app.use(loggerCon);

function loggerCon(req, res, next) {
  console.log(req.path, req.method);
  next();
}

// Main routes
app.use("/api/students", stuRoute);

// connect to db
mongoose
  .connect(process.env.DATABSE_CONNECT)
  .then(() => {
    console.log("connected to \x1b[34mMongoDb\x1b[0m");

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening to port:\x1b[33m", process.env.PORT + "\x1b[0m");
    });
  })
  .catch((err) => {
    console.log(err);
  });
