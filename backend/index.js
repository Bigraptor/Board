const express =require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const account = require("./router/account/index.js");
const board = require("./router/board");
const autoincrement = require("mongoose-auto-increment");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(session({
    secret : "Bigraptor",
    resave : "false",
    saveUninitialized : true
}));

app.use("/account", account);
app.use("/board", board);

////////////////////////////

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("MongoDB is Connected...");
});
mongoose.connect("mongodb://localhost/board");

////////////////////////////

app.listen(4000, () => {
    console.log("Port 4000, Connected...");
});