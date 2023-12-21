const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');


router.post('/section-add', sectionController.createSection);


router.get('/all-sections', sectionController.getAllSections);


router.get('/get-section/:id', sectionController.getSectionById);


// router.put('/update-section/:id', sectionController.updateSection);


router.post('/delete-section/:id', sectionController.deleteSection);

router.get('/edit-section/:id', sectionController.renderEditForm);


router.post('/edit-section/:id', sectionController.editSection);

module.exports = router;
        