const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  message: String,
  Timestamp: Date,
  status: String,
  title: String,
  
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;