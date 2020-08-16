/*===============================IMPORT MODULES===============================*/
const mongoose = require("mongoose");
/*============================================================================*/

/*=================================USER SCHEMA================================*/
const user = new mongoose.Schema({
    "userName": {type: String, unique: true, required: true},
    "userEmail": {type: String, unique: true, required: true},
    "userPhone": {type: String, unique: true, required: true},
    "userPassword": {type: String, unique: true, required: true},
    "secret": {type: String, required: true}
}, { collection: "users" });
/*============================================================================*/

module.exports = mongoose.model("users", user);