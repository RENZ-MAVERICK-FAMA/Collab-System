
const Student = require('../models/student');
 const Section = require('../models/section'); 
 const Grade = require('../models/grades'); 
const studentService = require('../services/studentService'); 


exports.createStudent = async (req, res) => {
  const { lrn, firstName, lastName, birthdate, gender, age, address, parentsName, Gmail, subject, city, section } = req.body;

  const newStudent = {
    lrn,
    firstName,
    lastName,
    birthdate,
    gender,
    age,
    address,
    parentsName,
    Gmail,
    subject,
    city,
  };

  try {
    const savedStudent = await studentService.createStudent(newStudent);

    // Check if the student was successfully saved
    if (savedStudent) {
      req.flash('success', 'Student registration successful!');
      res.redirect('/register'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', 'Student registration failed. Please try again.');
      res.redirect('/register'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/register'); // Redirect to the registration page or any other page
  }
};




exports.getAllStudents = async (req, res) => {
  try {
    const student = await studentService.getAllStudents();
    res.json({ redirect: '/Students' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching student.' });
  }
}


exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the student.' });
  }
}


  exports.deleteStudent = async (req, res) => {
    try {
      const studentId = req.params.studentId;  
      await Grade.deleteMany({ student: studentId });

    
      const sections = await Section.find({ students: studentId });
      await Promise.all(sections.map(section => {
        section.students.pull(studentId);
        return section.save();
      }));
      const student = await Student.findOneAndDelete({ studentId });

      if (!student) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      return res.status(200).json({ success: true, message: 'User deleted successfully.' });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error deleting user.' });
    }
  }





  