const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const teacherController = require('../controllers/teacherController');


router.post('/teacher-add', teacherController.createTeacher);


router.get('/all-teachers', teacherController.getAllTeachers);


router.get('/get-teacher/:id', teacherController.getTeacherById);





router.post('/delete-teacher/:id', teacherController.deleteTeacher);


router.get('/edit-teacher/:teacherId', async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        // Render the edit teacher form and pass the teacher data
        res.render('editteacher', { teacher });
    } catch (error) {
        console.error('Error fetching teacher data for editing:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to handle the teacher update
router.post('/update-teacher/:teacherId', async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const { firstName, lastName, teacherID, position, address, city, age, gender, contactInfo, contactNumber } = req.body;

        // Update the teacher in the database
        await Teacher.findByIdAndUpdate(teacherId, {
            firstName,
            lastName,
            teacherID,
            position,
            address,
            city,
            age,
            gender,
            contactInfo,
            contactNumber
        });

       
        res.redirect('/allteachers');

    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
