const Student = require('../models/student');


exports.createStudent = async (newStudent) => {
  return Student.create(newStudent);
}


exports.getAllStudents = async () => {
  return Student.find();
}


exports.getStudentById = async (studentId) => {
  return Student.findById(studentId);
}


// exports.updateStudent = async (studentId, updatedData) => {
//   return Student.findByIdAndUpdate(studentId, updatedData, { new: true });
// }


exports.deleteStudent = async (studentId) => {
  return Student.findByIdAndDelete(studentId);
}

