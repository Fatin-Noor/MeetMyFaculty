// Module 1 - Function 4: Admin Account Approval and User Management
// Owner: Fatin Noor Hoque (Member 1)
const userService = require("../services/userService");
const authService = require("../services/authService");

async function getUsers(req, res, next) { try { const users = await userService.listUsers(req.query); res.json({ success: true, count: users.length, data: users.map(authService.publicUser) }); } catch (error) { next(error); } }
async function getUser(req, res, next) { try { const user = await userService.getUser(req.params.id); if (!user) return res.status(404).json({ success: false, message: "User not found" }); res.json({ success: true, data: authService.publicUser(user) }); } catch (error) { next(error); } }
async function updateUser(req, res, next) {
  try { const allowed = ["name", "email", "phone", "department", "studentId", "designation", "faculty", "profilePicture"]; const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key))); const user = await userService.updateUser(req.params.id, updates); if (!user) return res.status(404).json({ success: false, message: "User not found" }); res.json({ success: true, message: "User details updated", data: authService.publicUser(user) }); } catch (error) { next(error); }
}
async function changeStatus(req, res, next) {
  try {
    const { accountStatus } = req.body;
    if (!["approved", "rejected", "inactive"].includes(accountStatus)) return res.status(400).json({ success: false, message: "Invalid account status" });
    if (req.params.id === req.user._id.toString() && accountStatus !== "approved") return res.status(400).json({ success: false, message: "You cannot deactivate your own account" });
    const target = await userService.getUser(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: "User not found" });
    if (target.role === "admin" && target.accountStatus === "approved" && accountStatus !== "approved" && await userService.activeAdminCount() <= 1) return res.status(400).json({ success: false, message: "At least one active admin account is required" });
    const user = await userService.updateUserStatus(req.params.id, accountStatus);
    res.json({ success: true, message: "Account status updated", data: authService.publicUser(user) });
  } catch (error) { next(error); }
}
async function changeRole(req, res, next) {
  try {
    const { role } = req.body;
    if (!["admin", "faculty", "student"].includes(role)) return res.status(400).json({ success: false, message: "Invalid role" });
    const target = await userService.getUser(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: "User not found" });
    if (target._id.equals(req.user._id)) return res.status(400).json({ success: false, message: "You cannot change your own role" });
    if (target.role === "admin" && role !== "admin" && target.accountStatus === "approved" && await userService.activeAdminCount() <= 1) return res.status(400).json({ success: false, message: "At least one active admin account is required" });
    const user = await userService.updateUserRole(req.params.id, role);
    res.json({ success: true, message: "User role updated", data: authService.publicUser(user) });
  } catch (error) { next(error); }
}
module.exports = { getUsers, getUser, updateUser, changeStatus, changeRole };
