const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "darshan@#23",
  database: "users",
});

con.connect(function (err) {
  if (err) {
    console.log("Error", err);
  } else {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS userstable(user_id INT AUTO_INCREMENT PRIMARY KEY,first_name VARCHAR(12), last_name VARCHAR(10) , email VARCHAR(15) )`;
    con.query(createTableQuery, (err, result) => {
      if (err) {
        console.log("Error while creating table", err);
      } else {
        console.log("Table is created!");
      }
    });
  }
});

module.exports = con;
