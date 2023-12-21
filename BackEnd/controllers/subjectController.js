
const Subject = require('../models/subject'); 
const subjectService = require('../services/subjectService'); 


exports.createSubject = async (req, res) => {
  try {
    const { subjectname,description, } = req.body;

    const newSubject={
     subjectname,
     description,
    
    };

    const savedSubject = await subjectService.createSubject(newSubject);


    if (savedSubject) {
      req.flash('success', 'Subject Added successful!');
      res.redirect('/subject'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', 'Adding subject failed. Please try again.');
      res.redirect('/subject'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/subject'); // Redirect to the registration page or any other page
  }
};



exports.getAllSubjects = async (req, res) => {
  try {
    const subject = await subjectService.getAllSubjects();
    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching subject.' });
  }
}


exports.getSubjectById = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const subject = await subjectService.getSubjectById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'subject not found.' });
    }
    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the subject.' });
  }
}


exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;  

   await subjectService.deleteSubject(subjectId);

    res.redirect('/allsubjects');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting user.' });
  }
}
exports.editSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;

  
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found.' });
    }



    res.render('editsubject', { subject });
    


  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error editing subject.' });
  }
};
exports.saveSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const { subjectname,description } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { subjectname ,description },
      { new: true } 
    );
    if (updatedSubject) {
      req.flash('success', 'Subject Update successful!');
      res.redirect('/allsubjects'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', ' Subject Update failed. Please try again.');
      res.redirect('/allsubjects'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
  }
};