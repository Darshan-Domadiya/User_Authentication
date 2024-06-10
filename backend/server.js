const express = require("express");
const userRouter = require("./routes/user");
const db = require("./models/user");
const { checkForAuthentication } = require("./middlewares/user");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 2024;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
