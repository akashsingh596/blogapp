const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

const {checkForAuthenticationCookie} = require('./middlewares/authentication')
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token"))

const userRouter = require("./routes/user");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("connected to mongodb");
});

app.get('/', (req, res) => {
  res.render('home', { user: req.user || null });
});

app.use(express.urlencoded({extended:false}))
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
