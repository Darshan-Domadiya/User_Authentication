// const { getUser } = require("../utils/user");

// function checkForAuthentication(req, res, next) {
//   const tokenCookie = req.cookies?.token;

//   if (!tokenCookie) {
//     console.log("please login user");
//   }

//   const token = tokenCookie;

//   const user = getUser(token);

//   req.user = user;

//   return next();
// }

// module.exports = { checkForAuthentication };
