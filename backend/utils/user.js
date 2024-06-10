const JWT = require("jsonwebtoken");
const secret = "D@rsHan@#2024";

function setUser(user) {
  const payload = {
    email: user.email,
  };
  return JWT.sign(payload, secret);
}

function getUser(token) {
  if (!token) return null;

  return JWT.verify(token, secret);
}

module.exports = { setUser, getUser };
