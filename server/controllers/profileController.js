// Module 1 - Function 2: Profile Management
// Owner: Redoan Hasan Rafin (Member 2)
const userService = require("../services/userService");
const authService = require("../services/authService");
const profileFields = ["name", "phone", "profilePicture", "department", "studentId", "designation", "faculty", "personalWebpage", "academicQualifications", "trainingExperience", "teachingExperience", "researchInterests", "publications", "awardsAndScholarships", "previousEmployment"];

async function updateMyProfile(req, res, next) {
  try {
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => profileFields.includes(key)));
    const user = await userService.updateOwnProfile(req.user._id, updates);
    res.json({ success: true, message: "Profile updated", data: authService.publicUser(user) });
  } catch (error) { next(error); }
}
module.exports = { updateMyProfile };

