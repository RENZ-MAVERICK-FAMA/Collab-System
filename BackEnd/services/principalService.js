const Principal = require('../models/principal');


exports.createPrincipal = async (newPrincipal) => {
  return Principal.create(newPrincipal);
}


exports.getAllPrincipals = async () => {
  return Principal.find();
}


exports.getPrincipalById = async (principalId) => {
  return Principal.findById(principalId);
}


exports.updatePrincipal = async (principalId, updatedData) => {
  return Principal.findByIdAndUpdate(principalId, updatedData, { new: true });
}

exports.deletePrincipal = async (principalId) => {
  return Principal.findByIdAndRemove(principalId);
}
