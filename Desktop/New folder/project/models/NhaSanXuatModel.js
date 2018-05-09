var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var nhasanxuatSchema = new Schema({
  ten: { type: String, required: [true, "Tên trống"], max: 100 },
  hinh:{ type: String, required:[true, "Đường dẫn trống"]},
  trungtambaohanh: {type: String, required: [true, "Trung tâm bảo hành trống"], max: 100}
});

module.exports = mongoose.model("Nhasanxuat", nhasanxuatSchema);
