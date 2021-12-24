const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const users = {
  id: [1, 2, 3, 4],
  email: ["rajmarde615@gmail.com", "rajmarde1816@gmail.com"],
  password: ["rajmarde", "rajmarde"],
};

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/", (req, res) => {
  if (req.session.userId === undefined) {
    console.log("You are not logged in");
  } else {
    console.log("You are logged in");
  }
  res.render("index");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  if (users.password.length > 0) {
    if (req.body.password === users.password[0] && email === users.email[0]) {
      req.session.userId = users.id[0];
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

app.listen(3000, () => console.log("server started on port 3000"));
