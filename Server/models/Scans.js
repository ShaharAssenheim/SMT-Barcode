const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  Send_Date: { type: Date, required: true, default: Date.now },
  Line: {type: String},
});

module.exports= mongoose.model('Scans', scanSchema);
