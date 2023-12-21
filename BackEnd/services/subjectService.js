const Subject = require('../models/subject');
exports.createSubject = async (newSubject) => {
  return Subject.create(newSubject);
}


exports.getSubjectById = (subjectId) => {
  return Subject.findById(subjectId);
};

exports.updateSubject = (subjectId, updatedData) => {
  return Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });
};

exports.deleteSubject = (subjectId) => {
  return Subject.findOneAndDelete({ _id: subjectId});
};
