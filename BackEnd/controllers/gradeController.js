
const Grade = require('../models/grades');
const Student = require('../models/student');
const Subject = require('../models/subject');
const gradeService = require('../services/gradeService');

exports.createGrade = async (req, res) => {
  try {
    const { grade, subject, quarterNumber, student } = req.body;

    const newGrade = {
      grade,
      subject,
      quarterNumber,
      student,
    };

    const savedGrade = await gradeService.createGrade(newGrade);

    res.status(201).json(savedGrade);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllGrades = async (req, res) => {
  try {
    const grade = await gradeService.getAllGrades();
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching grade.' });
  }
}

// Get a user by ID
exports.getGradeById = async (req, res) => {
  try {
    const gradeId = req.params.id;
    const grade = await gradeService.getGradeById(gradeId);
    if (!grade) {
      return res.status(404).json({ message: 'grade not found.' });
    }
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the grade.' });
  }
}

// Update a user by ID
// exports.updateGrade = (req, res) => {
//   const userId = req.params.id;
//   const updatedData = req.body;
//   User.findByIdAndUpdate(userId, updatedData, { new: true })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: 'User not found.' });
//       }
//       res.json(user);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to update the user.' });
//     });
// };

exports.deleteGrade = async (req, res) => {
  try {
    const gradeId = req.params.gradeId;  

    const grade = await grade.findOneAndDelete({ gradeId });

    if (!grade) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting user.' });
  }
}


exports.updateGrade = async (req, res) => {
  try {
    const { subjectName, quarter1, quarter2, quarter3, quarter4 } = req.body;
    const studentId = req.user.id;

    // Find the corresponding subject
    const subject = await Subject.findOne({ subjectname: subjectName });

    // Find the grade for the specified subject and student
    const existingGrade = await Grade.findOne({
      subject: subject._id,
      student: studentId,
    });

    // Update or create a new grade
    if (existingGrade) {
      existingGrade.quarter1 = quarter1;
      existingGrade.quarter2 = quarter2;
      existingGrade.quarter3 = quarter3;
      existingGrade.quarter4 = quarter4;

      await existingGrade.save();
    } else {
      const newGrade = new Grade({
        grade: 0,
        subject: subject._id,
        student: studentId,
        quarter1,
        quarter2,
        quarter3,
        quarter4,
      });

      await newGrade.save();
    }

    res.status(200).json({ success: true, message: 'Grades updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating grades.' });
  }
};