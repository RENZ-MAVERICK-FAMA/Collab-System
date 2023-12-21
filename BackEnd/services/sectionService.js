const Section = require('../models/section');


exports.createSection = async (newSection) => {
  return Section.create(newSection);
}


exports.getAllSections = async () => {
  return Section.find();
}


exports.getSectionById = async (sectionId) => {
  return Section.findById(sectionId);
}


// exports.updateSection = async (SectionId, updatedData) => {
//   return Section.findByIdAndUpdate(SectionId, updatedData, { new: true });
// }


exports.deleteSection = async (sectionId) => {
  return Section.findOneAndRemove({ _id: sectionId});
}
exports.updateSection = async (sectionId, updateData) => {
  return Section.findByIdAndUpdate(sectionId, updateData, { new: true });
};
