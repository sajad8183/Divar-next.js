const express = require("express");
const path = require("path");
const cors = require("cors");

const otpRoutes = require("./routes/v1/otp");
const cityRoutes = require("./routes/v1/city");

const app = express();

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "posts", "photos"))
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/otp", otpRoutes);
app.use("/api/cities", cityRoutes);

module.exports = app;
