const GradeLevelService = require('../services/gradelevelService');
const gradelevel = require('../models/gradelevel');


exports.createGradeLevel = async (req, res) => {
  try {
    const { name,sections } = req.body;

    const newgradelevel = {
      name,sections
    };

    const savedgradelevel = await GradeLevelService.createGradeLevel(newgradelevel); 

    res.status(201).json(savedgradelevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};


exports.getAllGradeLevels = async (req, res) => {
  try {
    const gradelevel = await GradeLevelService.getAllGradeLevels();
    res.json(gradelevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching gradelevel.' });
  }
}


exports.getGradeLevelById = async (req, res) => {
  try {
    const gradelevelId = req.params.id;
    const gradelevel = await GradeLevelService.getGradeLevelById(gradelevelId);
    if (!gradelevel) {
      return res.status(404).json({ message: 'gradelevel not found.' });
    }
    res.json(gradelevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the gradelevel.' });
  }
}

exports.updateGradeLevel = async (req, res) => {
  try {
    const gradeLevelId = req.params.id;
    const updatedData = req.body;
    const gradeLevel = await GradeLevelService.updateGradeLevel(gradeLevelId, updatedData);
    if (!gradeLevel) {
      return res.status(404).json({ message: 'Grade level not found.' });
    }
    res.json(gradeLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the grade level.' });
  }
}

// Delete a grade level by ID
exports.deleteGradeLevel = async (req, res) => {
  try {
    const gradelevelId = req.params.gradelevelId;  

    const gradelevel = await gradelevel.findOneAndDelete({ gradelevelId });

    if (!gradelevel) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting user.' });
  }
}