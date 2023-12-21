const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
  principalId: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    unique: true,
  },contactInfo: {
    type: String,
    required: true,
    unique: true,
  },contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },gender: String,
  address:String,
  age:Number,
  role:{
    type:String,
    default:"Principal"
      },
      city:{
        
        type:String,
      }
});

const Principal = mongoose.model('Principal', principalSchema);

module.exports = Principal;
