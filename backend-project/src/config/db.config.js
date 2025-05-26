require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

db.connect((err) => {
  if (err) return console.log("Failed to connect", err);
  console.log("Connected to Database");
});


module.exports = db;