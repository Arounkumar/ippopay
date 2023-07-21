const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  conditions: {
    required: false,
    type: Object,
  },
  stepsRequired: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("passwordValidation", dataSchema);
