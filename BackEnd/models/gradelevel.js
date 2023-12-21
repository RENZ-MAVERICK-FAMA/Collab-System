const mongoose = require('mongoose');

const gradeLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  }],
});

const gradeLevel = mongoose.model('gradeLevel', gradeLevelSchema);

module.exports = gradeLevel;
