var mongoose = require("mongoose");

var mongoDB = "mongodb://tolu5455:intheend54@ds121730.mlab.com:21730/computer";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error'));

var Schema = mongoose.Schema;
var nhasanxuatSchema = new Schema({
  ten: { type: String, required: [true, "Tên trống"], max: 100 },
  hinh:{ type: String, required:[true, "Đường dẫn trống"]},
  trungtambaohanh: {type: String, required: [true, "Trung tâm bảo hành trống"], max: 100}
});

nhasanxuatSchema.virtual('url').get(function(){
  return '/catalog/nhasanxuat/' + this._id + '/1';
})

module.exports = mongoose.model("Nhasanxuat", nhasanxuatSchema);
