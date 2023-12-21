const gradeLevel = require('../models/gradelevel');

// Create a new grade level
exports.createGradeLevel = async (newgradelevel) => {
  return gradeLevel.create(newgradelevel);
}

// Get all grade levels
exports.getAllGradeLevels = async () => {
  return gradeLevel.find().populate('sections');
}

// Get a grade level by ID
exports.getGradeLevelById = async (gradeLevelId) => {
  return gradeLevel.findById(gradeLevelId).populate('sections');
}

// Update a grade level by ID
exports.updateGradeLevel = async (gradeLevelId, updatedData) => {
  return gradeLevel.findByIdAndUpdate(gradeLevelId, updatedData, { new: true });
}

// Delete a grade level by ID
exports.deleteGradeLevel = async (gradeLevelId) => {
  return gradeLevel.findByIdAndRemove(gradeLevelId);
}
