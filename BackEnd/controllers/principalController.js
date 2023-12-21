const principalService = require('../services/principalService'); 
const Principal = require('../models/principal'); 


exports.createPrincipal = async (req, res) => {
  try {
    const { principalId, firstName, lastName,age, position, gender, address, contactNumber,contactInfo,city } = req.body;

    const newPrincipal = {
      principalId, 
      firstName, 
      lastName,
      age, 
      position,
      gender,
      address,
      contactNumber,
      contactInfo,
      city
    };

    const savedPrincipal = await principalService.createPrincipal(newPrincipal); 

    if (savedPrincipal) {
      req.flash('success', 'Principal Added successful!');
      res.redirect('/teacher'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', 'Adding Principal failed. Please try again.');
      res.redirect('/teacher'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/teacher'); // Redirect to the registration page or any other page
  }
};




exports.getAllPrincipals = async(req, res) => {
  try {
    const principal = await principalService.getAllPrincipals();
    res.json(principal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching principal.' });
  }
}

exports.getpPincipalById = async(req, res) => {
  try {
    const principalId = req.params.id;
    const principal = await principalService.getPrincipalById(principalId);
    if (!principal) {
      return res.status(404).json({ message: 'principal not found.' });
    }
    res.json(principal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the principal.' });
  }
}


exports.updatePrincipal = async (req, res) => {
  try {
    const principalId = req.params.id;
    const updatedData = req.body;
    const principal = await principalService.updatePrincipal(principalId, updatedData);
    if (!principal) {
      return res.status(404).json({ message: 'principal not found.' });
    }
    res.json(principal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the principal.' });
  }
}


exports.deletePrincipal = async(req, res) => {
  try {
    const principalId = req.params.id;
    await principalService.deleteprincipal(principalId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the principal.' });
  }
}


