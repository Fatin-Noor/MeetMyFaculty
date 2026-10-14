const User = require("../models/User");

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus,
    department: user.department,
    studentId: user.studentId,
    designation: user.designation,
    profilePicture: user.profilePicture,
    phone: user.phone,
    faculty: user.faculty,
    personalWebpage: user.personalWebpage,
    academicQualifications: user.academicQualifications,
    trainingExperience: user.trainingExperience,
    teachingExperience: user.teachingExperience,
    researchInterests: user.researchInterests,
    publications: user.publications,
    awardsAndScholarships: user.awardsAndScholarships,
    previousEmployment: user.previousEmployment,
  };
}

const findUserByEmail = (email) => User.findOne({ email: email.trim().toLowerCase() }).select("+password");
const createUser = (data) => User.create(data);
const getUserById = (id) => User.findById(id);

module.exports = { publicUser, findUserByEmail, createUser, getUserById };

