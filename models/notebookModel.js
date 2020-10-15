var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var notebookSchema = new Schema({
  userId: ObjectId,
  date: Date,
  title: String,
  notes: [
    {
      id: ObjectId,
      title: String,
      content: String,
      editDate: Date,
    },
  ],
});

module.exports = mongoose.model("notebook", notebookSchema);
