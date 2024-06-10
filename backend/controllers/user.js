const db = require("../models/user");
const { check, validationResult } = require("express-validator");
const { setUser } = require("../utils/user");
const bcrypt = require("bcrypt");
const salRounds = 10;

function getAllUsersData(req, res) {
  const userQuery = `SELECT first_name,last_name,email,user_id FROM userstable`;
  db.query(userQuery, (err, result) => {
    if (err) {
      console.log("Error", err);
      return res.json({ message: "Internal server error!" });
    }
    return res.send(result);
  });
}

const validateCreateUser = [
  check("first_name").notEmpty().withMessage("FirstName should not be empty"),
  check("last_name").notEmpty().withMessage("LastName should not be empty"),
  check("email").notEmpty().withMessage("Email should not be empty"),
  check("password").notEmpty().withMessage("Password should not be empty"),
];

function createNewUser(req, res) {
  const errors = validationResult(req);

  const { first_name, last_name, email, password } = req.body;
  const createUserQuery = `INSERT INTO userstable(first_Name,last_Name,email,password) VALUES (?, ?, ?, ?)`;
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ error: "true", status: "422", message: errors.array() });
  }

  db.query(
    createUserQuery,
    [first_name, last_name, email, password],
    (err, result) => {
      if (err) {
        console.log("Some error while creating new user", err);
      }
      return res
        .status(200)
        .json({ status: "200", message: "User Created!", result });
    }
  );
}

function deleteUser(req, res) {
  const userId = req.body.userId;

  const deleteUserQuery = `DELETE FROM userstable WHERE user_id = ? `;
  db.query(deleteUserQuery, [userId], (err, result) => {
    if (err) {
      console.log("Error while deleting the user", err);
      return;
    }
    res.send("User is deleted!");
  });
}

function updateUserDetails(req, res) {
  const userId = req.params.userId;

  const updateUserDetailsShow = `SELECT * FROM userstable WHERE user_id = ?`;
  db.query(updateUserDetailsShow, [userId], (err, result) => {
    if (err) {
      console.log("Error while fetching update data of user", err);
      return;
    }
    res.send(result[0]);
  });
}

function updateUser(req, res) {
  const userId = req.params.userId;
  const { firstName, lastName, email } = req.body;

  const updateUserQuery = `UPDATE userstable SET first_name = ?, last_name = ?, email = ? WHERE user_id = ? `;
  db.query(
    updateUserQuery,
    [firstName, lastName, email, userId],
    (err, result) => {
      if (err) {
        console.log("Error while updating!", err);
        return;
      }
      res.send("User updated!");
    }
  );
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  const hashedPasswordFromDatabaseQuery = `SELECT password FROM userstable WHERE email = ? `;

  db.query(hashedPasswordFromDatabaseQuery, [email], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while database password!" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    } else {
      const hashedPasswordFromDatabase = result[0].password;

      bcrypt.compare(
        password,
        hashedPasswordFromDatabase,
        (err, isMatchedPassword) => {
          if (err) {
            console.log("error in comparing passwords", err);
            return res
              .status(500)
              .json({ message: "An error occured while user login!" });
          }
          if (!isMatchedPassword) {
            return res
              .status(404)
              .json({ message: "Invalid username or password!" });
          }

          const findUserLoginQuery = `SELECT * FROM userstable WHERE email = ? `;

          db.query(findUserLoginQuery, [email], (err, result) => {
            if (err) {
              console.log("Error while getting data of user", err);
              return res.status(404).json({
                message: "An error occured while processing the data!",
              });
            }
            if (result.length === 0) {
              return res
                .status(404)
                .json({ message: "Invalid username or password!" });
            }

            const token = setUser(result[0]);
            res.cookie("token", token);

            return res.status(200).json("User found!");
          });
        }
      );
    }
  });
}

async function userSignUp(req, res) {
  const errors = validationResult(req);
  const { first_name, last_name, email } = req.body;
  const password = req.body.password;

  const encryptedPassword = await bcrypt.hash(password, salRounds);

  const userSignUpQuery = `INSERT INTO userstable (first_name,last_name,email,password) VALUES(?, ?, ?, ?)`;

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ error: "true", status: 422, message: errors.array() });
  }

  db.query(
    userSignUpQuery,
    [first_name, last_name, email, encryptedPassword],
    (err, result) => {
      if (err) {
        console.log("user signup error", err);
        return res
          .status(500)
          .json({ message: "Something went wrong with the server!" });
      }

      if (result.affectedRows === 0) {
        res.status(500).json({ message: "User signup failed!" });
      }

      return res.status(200).json({ message: "User signup successfully!" });
    }
  );
}

module.exports = {
  getAllUsersData,
  createNewUser,
  deleteUser,
  updateUserDetails,
  updateUser,
  validateCreateUser,
  userLogin,
  userSignUp,
};
