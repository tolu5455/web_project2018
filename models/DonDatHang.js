var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ddhSchema = new Schema({
  tenTK: { type: String, required: true, max: 100 },
  tenKH: { type: String, required: true, max: 100 },
  sdt: { type: Number, required: true},
  diachi:{ type: String, required:true},
  tenSP: { type: Array, required:true},
  tongtien: { type: Number, min: 0},
  trangthai: { type: String, required: true },
});

module.exports = mongoose.model("DDH", ddhSchema);
