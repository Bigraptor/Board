const mongoose = require("mongoose");
const { Schema } = mongoose;

const Account = new Schema({
    id : String,
    pw : String,
    nickname : String,
    created : { type : Date, default : Date.now() }
});

module.exports = mongoose.model("account", Account);
