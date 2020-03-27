const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./mysql-conn");

//  TO RUN DO THE FOLLOWING

// Create a file named "mysql-conn.js"
// Copy and paste the following in the file
/*
var mysql = require("mysql");
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //this should be your username for MySQL
    password: '', //your password for MySQL
    database: 'cs160'
  });
  // Connect
  db.connect(err => {
    if (err) {
      console.log(err);
    }
  });

  module.exports = db;

*/


//  THEN RUN THE FOLLOWING COMMANDS
// npm install
// npx nodemon

  app.use(cors());


  app.get("/login", (req, res) => {
    const { email } = req.query;
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });
  
  app.get("/addUser", (req, res) => {
    console.log("added a user");
    const { username, password, email, administrator } = req.query;
    const INSERT_USER_QUERY = `INSERT INTO users (email,username,password,administrator) VALUES( '${email}','${username}','${password}','${administrator}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.listen("4000", () => {
    console.log("Server started on port 4000");
  });

