const Grade = require('../models/grades');

exports.createGrade = async (newGrade) => {
  return Grade.create(newGrade);
}

exports.getGradeById = (gradeId) => {
  return Grade.findById(gradeId);
};

exports.updateGrade = (gradeId, updatedData) => {
  return Grade.findByIdAndUpdate(gradeId, updatedData, { new: true });
};

exports.deleteGrade = (gradeId) => {
  return Grade.findByIdAndRemove(gradeId);
};
