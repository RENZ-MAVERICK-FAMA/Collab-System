const teacherService = require('../services/teacherService'); 
const Teacher = require('../models/teacher'); 


exports.createTeacher = async (req, res) => {
  try {
    const { teacherID, firstName, lastName,age, position, gender, address, contactNumber,contactInfo,section,city } = req.body;

    const newTeacher = {
      teacherID, 
      firstName, 
      lastName,
      age, 
      position,
      gender,
      address,
      contactNumber,
      contactInfo,
      section,
      city
     
    };

    const savedteacher = await teacherService.createTeacher(newTeacher); 

    if (savedteacher) {
      req.flash('success', 'Teacher Added successful!');
      res.redirect('/teacher'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', 'Adding Teacher failed. Please try again.');
      res.redirect('/teacher'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/teacher'); // Redirect to the registration page or any other page
  }
};




exports.getAllTeachers = async(req, res) => {
  try {
    const teacher = await teacherService.getAllTeachers();
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching teacher.' });
  }
}

exports.getTeacherById = async(req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await teacherService.getTeacherById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'teacher not found.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the teacher.' });
  }
}


exports.updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updatedData = req.body;
    const teacher = await teacherService.updateTeacher(teacherId, updatedData);
    if (!teacher) {
      return res.status(404).json({ message: 'teacher not found.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the teacher.' });
  }
}


exports.deleteTeacher = async(req, res) => {
  try {
    const teacherId = req.params.id;
    await teacherService.deleteTeacher(teacherId);
    res.redirect('/allteachers');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the teacher.' });
  }
}


