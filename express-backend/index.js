const express = require("express");
const port = 4000;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const carRouter = require("./routes/carRoute");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);

const dbURL = "mongodb://localhost:27017/cabService";
mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected");
  }
);
app.listen(port, () => {
  console.log("Node server is running on port " + port);
});
