  const mongoose = require('mongoose');

  const gradeSchema = new mongoose.Schema({
   
    quarter1: {
      type: Number,

    }, quarter2: {
      type: Number,

    }, quarter3: {
      type: Number,

    }, quarter4: {
      type: Number,

    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique:false

    },
  });








  const Grade = mongoose.model('Grade', gradeSchema);

  module.exports = Grade;
