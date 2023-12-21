const express = require('express');
const router = express.Router();
const gradeLevelController = require('../controllers/gradelevelController');

// Create a grade level
router.post('/gradelevel-add', gradeLevelController.createGradeLevel);

// Get all grade levels
router.get('/all-gradelevels', gradeLevelController.getAllGradeLevels);

// Get a grade level by ID
router.get('/get-gradelevel/:id', gradeLevelController.getGradeLevelById);

// Update a grade level by ID
// router.put('/update-gradelevel/:id', gradeLevelController.updateGradeLevel);

// Delete a grade level by ID
router.delete('/delete-gradelevel/:id', gradeLevelController.deleteGradeLevel);

module.exports = router;
