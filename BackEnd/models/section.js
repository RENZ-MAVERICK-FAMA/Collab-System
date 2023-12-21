const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }], teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
