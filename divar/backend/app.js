const path = require("path");
const express = require("express");

//* middlewares
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errorHandlers");

//* routes
const supportRoutes = require("./routes/v1/support");
const authRoutes = require("./routes/v1/auth");
const categoryRoutes = require("./routes/v1/category");
const postRoutes = require("./routes/v1/post");
const userRoutes = require("./routes/v1/user");
const usersRoutes = require("./routes/v1/users");
const apiDocRoutes = require("./routes/v1/apidoc");
const bookmarkRoutes = require("./routes/v1/bookmark");
const noteRoutes = require("./routes/v1/note");
const socialRoutes = require("./routes/v1/social");
const locationRoutes = require("./routes/v1/location");
const dashboardRoutes = require("./routes/v1/dashboard");

const app = express();

//* BodyPaser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* CORS Policy Definitions
app.use(setHeaders);

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/v1/support", supportRoutes);
app.use("/v1/location", locationRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/category", categoryRoutes);
app.use("/v1/post", postRoutes);
app.use("/v1/bookmark", bookmarkRoutes);
app.use("/v1/note", noteRoutes);
app.use("/v1/social", socialRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/users", usersRoutes);
app.use("/v1/dashboard", dashboardRoutes);
app.use("", apiDocRoutes);

//* Error Controller
app.use((req, res) => {
  console.log("this path is not available:", req.path);
  res.status(404).json({
    message: "404! Path Not Found. Please double check the path/method.",
  });
});

app.use(errorHandler);

module.exports = app;
