const Notification = require('../models/notification');

// Create a new notification
exports.createNotification = async (newNotification) => {
  return Notification.create(newNotification);
}

// Get all notifications
exports.getAllNotifications = async () => {
  return Notification.find();
}

// Get a notification by ID
exports.getNotificationById = async (notificationId) => {
  return Notification.findById(notificationId);
}

// Update a notification by ID
exports.updateNotification = async (notificationId, updatedData) => {
  return Notification.findByIdAndUpdate(notificationId, updatedData, { new: true });
}

// Delete a notification by ID
exports.deleteNotification = async (notificationId) => {
  return Notification.findByIdAndRemove(notificationId);
}
