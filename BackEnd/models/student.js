const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  lrn: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  parentsName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Gmail: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  role:{
type:String,
default:"Student"
},
subject: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Subject',
  required: true,
}],
city:{
  
  type:String,
}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;