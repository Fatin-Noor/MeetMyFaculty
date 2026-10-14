const User = require("../models/User");

function getFaculty(query) {
  const filter = { role: "faculty", accountStatus: "approved" };
  if (query.department) filter.department = new RegExp(query.department, "i");
  if (query.search) {
    const search = new RegExp(query.search, "i");
    filter.$or = [{ name: search }, { designation: search }, { department: search }, { researchInterests: search }];
  }
  return User.find(filter).select("name designation department email profilePicture researchInterests faculty").sort({ name: 1 });
}
const getFacultyById = (id) => User.findOne({ _id: id, role: "faculty", accountStatus: "approved" }).select("-password");
module.exports = { getFaculty, getFacultyById };
