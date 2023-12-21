const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');


router.post('/grade-add', gradeController.createGrade);


router.get('/grades', gradeController.getAllGrades);


router.get('/grades/:id', gradeController.getGradeById);


router.delete('/grades/:id', gradeController.deleteGrade);

module.exports = router;
