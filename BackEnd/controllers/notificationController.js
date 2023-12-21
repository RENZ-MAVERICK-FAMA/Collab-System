
const express = require('express');
const Notification = require('../models/notification');
const notificationService = require('../services/notificationService'); 


exports.createNotification = async (req, res) => {
  try {
    const {  title,
      message,
      recipient,
      sender,
      Timestamp,
      status } = req.body;

    const newNotification = {
      title,
      message,
      recipient,
      sender,
      Timestamp,
      status
    };

    const savedNotification = await notificationService.createNotification(newNotification);

    res.status(201).json(savedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the notification.' });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notification = await notificationService.getA0llNotifications();
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching notification.' });
  }
}


exports.getNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await notificationService.getNotificationById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'notification not found.' });
    }
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the notification.' });
  }
}


exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;  

    const notification = await notification.findOneAndDelete({ notificationId });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting user.' });
  }
}
