let createError = require("http-errors");
let express = require("express");
let path = require("path");

let indexRouter = require("./routes/index");

// DataBase
const mysql = require("mysql-await");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "IEI",
});
con.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = { app, con };
