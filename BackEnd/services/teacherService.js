const Teacher = require('../models/teacher');

exports.createTeacher = async (newTeacher) => {
  return Teacher.create(newTeacher);
}
exports.getTeacherById = async (teacherId) => {
  return Teacher.findById(teacherId);
}

exports.getAllTeachers =async () => {
  return Teacher.find();
}

exports.updateTeacher =async  (teacherId, updatedData) => {
  return Teacher.findByIdAndUpdate(teacherId, updatedData, { new: true });
};

exports.deleteTeacher = async (teacherId) => {
  return Teacher.findOneAndDelete({ _id: teacherId });
};
