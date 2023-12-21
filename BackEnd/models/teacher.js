const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName:String,
  teacherID:{type:Number,
    unique: true,},
  position: String,
  address:String,
  age:{type:Number,},
  contactInfo:String,
  gender: String,
  contactNumber: {type:Number,
    unique: true,},
    role:{
type: String,
default: "Teacher",
section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },

    },
    city:{
      
      type:String,
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
