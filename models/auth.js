const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    }
});

const authModel = mongoose.model("users", authSchema);

module.exports = authModel;