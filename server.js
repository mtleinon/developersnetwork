const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

// DB config
const dbURI = require("./config/keys").mongoURI;
console.log("dbURI", dbURI);

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to database"))
  .catch(err => console.log("CATCH: db", err));

// Routes
app.get("/", (req, res) => res.send("Hello !!!"));
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Listening port ", port));
