const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const Student = require('../models/student');
const Subject = require('../models/subject');


router.post('/student-add', studentController.createStudent);


router.get('/all-students', studentController.getAllStudents);


router.get('/get-student/:id', studentController.getStudentById);




router.get('/edit-student/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById(studentId).populate('subject');
        const subjects = await Subject.find(); // Corrected the variable name to 'subjects'

        if (!student) {
            return res.status(404).send('Student not found');
        }

        // Render the edit teacher form and pass the teacher data
        res.render('editstudent', { student, subjects, messages: req.flash() });
    } catch (error) {
        console.error('Error fetching student data for editing:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/save-student/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const {  lrn,
            firstName,
            lastName,
            birthdate,
            gender,
            age,
            address,
            parentsName,
            Gmail,
            subject,
            city, } = req.body;

        // Update the teacher in the database
        await Student.findByIdAndUpdate(studentId, {
            lrn,
    firstName,
    lastName,
    birthdate,
    gender,
    age,
    address,
    parentsName,
    Gmail,
    subject,
    city,
        });

       
        res.redirect('/allstudents');

    } catch (error) {
        console.error('Error updating studentr:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-student/:StudentId', studentController.deleteStudent);

module.exports = router;


