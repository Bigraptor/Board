const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoincrement = require("mongoose-auto-increment");

const Board = new Schema({
    no : {type : Number, default : 0},
    title : String,
    article : String,
    writer : String,
    created : { type : Date, default : Date.now},
    comment : [{
        writer : String,
        contents : String,
        created : { type : Date, default : Date.now}
    }]
});

module.exports = mongoose.model("board", Board);
autoincrement.initialize(mongoose.connection);

Board.plugin(autoincrement.plugin, {
    model: 'Board',
    field: 'no',
    startAt: 1,
    incrementBy: 1
  });
  