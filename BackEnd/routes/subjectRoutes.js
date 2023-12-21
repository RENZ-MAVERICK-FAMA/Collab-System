const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');


router.post('/subject-add', subjectController.createSubject);


router.get('/all-subjects', subjectController.getAllSubjects);


router.get('/get-subject/:id', subjectController.getSubjectById);


router.get('/edit-subject/:id', subjectController.editSubject);

router.post('/edit-subject/:id', subjectController.saveSubject);

router.post('/delete-subject/:id', subjectController.deleteSubject);

module.exports = router;
