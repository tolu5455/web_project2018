var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var cmtSchema = new Schema({
  tenSP: { type: String, required: true},
  tenKH: { type: Array, required: true},
  noidung: { type: Array, required: true},
});

module.exports = mongoose.model("CMT", cmtSchema);
