const User = require("../models/User");

function listUsers(query) {
  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.status) filter.accountStatus = query.status;
  if (query.department) filter.department = new RegExp(query.department, "i");
  if (query.search) {
    const search = new RegExp(query.search, "i");
    filter.$or = [{ name: search }, { email: search }, { department: search }];
  }
  return User.find(filter).sort({ createdAt: -1 });
}

const getUser = (id) => User.findById(id);
const updateOwnProfile = (id, values) => User.findByIdAndUpdate(id, values, { new: true, runValidators: true });
const updateUserStatus = (id, accountStatus) => User.findByIdAndUpdate(id, { accountStatus }, { new: true, runValidators: true });
const updateUserRole = (id, role) => User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
const updateUser = (id, values) => User.findByIdAndUpdate(id, values, { new: true, runValidators: true });
const activeAdminCount = () => User.countDocuments({ role: "admin", accountStatus: "approved" });

module.exports = { listUsers, getUser, updateOwnProfile, updateUserStatus, updateUserRole, updateUser, activeAdminCount };

