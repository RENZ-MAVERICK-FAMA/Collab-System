const SectionService = require('../services/sectionService');
const Section = require('../models/section');
const Student = require('../models/student');
const Teacher = require('../models/teacher');



exports.createSection = async (req, res) => {
  try {
    const { name,students,teacher} = req.body;

    const newSection = {
      
      name,students,teacher
    };

    const savedsection = await SectionService.createSection(newSection);

    if (savedsection) {
      req.flash('success', 'Section Added successful!');
      res.redirect('/sections'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', 'Adding Section failed. Please try again.');
      res.redirect('/sections'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/sections'); // Redirect to the registration page or any other page
  }
};
exports.getAllSections = async (req, res) => {
  try {
    const section = await SectionService.getAllSections();
    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching section.' });
  }
}


exports.getSectionById = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const section = await SectionService.getSectionById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'section not found.' });
    }
    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the section.' });
  }
}


exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
   
    const section = await Section.findOneAndDelete({ _id: sectionId });

    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found.' });
    }

    res.redirect('/allsections');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting section.' });
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findOne({_id:sectionId});
    const allStudents = await Student.find();
    const allTeachers = await Teacher.find();
    res.render('editsection', { section,allStudents,allTeachers,messages: req.flash()});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.editSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const { name ,students,teacher } = req.body;

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { name ,students,teacher },
      { new: true } 
    );
    if (updatedSection) {
      req.flash('success', 'Section Update successful!');
      res.redirect('/allsections'); // Redirect to the registration page or any other page
    } else {
      req.flash('error', ' Section Update failed. Please try again.');
      res.redirect('/allsections'); // Redirect to the registration page or any other page
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred. Please try again.');
  }
};