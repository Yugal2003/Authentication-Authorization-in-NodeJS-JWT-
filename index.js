const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const validateUser  = require("./middleware/auth");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use(express.json());

app.use(authRoute);
app.use(validateUser, postRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connect With MongoDB Successful"))
.catch(() => console.log("Error While Connect To MongoDB"));

app.listen(9999, () => {
    console.log("Server running on Port 9999");
});