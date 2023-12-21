const express = require('express');
const router = express.Router();
const principalController = require('../controllers/principalController');


router.post('/principal-add', principalController.createPrincipal);


router.get('/all-principals', principalController.getAllPrincipals);


// router.get('/get-principal/:id', principalController.getPrincipalById);


// router.put('/update-principal/:id', principalController.updatePrincipal);


router.delete('/delete-principal/:id', principalController.deletePrincipal);

module.exports = router;
