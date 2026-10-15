// Module 1 - Function 1: User Registration
// Owner: Fatin Noor Hoque (Member 1)
const bcrypt = require("bcryptjs");
const authService = require("../services/authService");

async function signup(req, res, next) {
  try {
    const { name, email, password, role, department, phone, studentId, designation } = req.body;
    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({ success: false, message: "Name, email, password, role, and department are required" });
    }
    if (!["student", "faculty"].includes(role)) return res.status(400).json({ success: false, message: "Only Student or Faculty can register" });
    if (!email.trim().toLowerCase().endsWith("@diu.edu.bd")) return res.status(400).json({ success: false, message: "Use a valid DIU institutional email address" });
    if (role === "student" && !studentId) return res.status(400).json({ success: false, message: "Student ID is required" });
    if (role === "faculty" && !designation) return res.status(400).json({ success: false, message: "Designation is required" });
    if (password.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) return res.status(409).json({ success: false, message: "Email is already registered" });
    const user = await authService.createUser({
      name: name.trim(), email: email.trim().toLowerCase(), password: await bcrypt.hash(password, 10), role,
      department: department.trim(), phone: phone?.trim(), studentId: studentId?.trim(), designation: designation?.trim(), accountStatus: "pending",
    });
    res.status(201).json({ success: true, message: "Registration successful. Your account is waiting for admin approval.", data: authService.publicUser(user) });
  } catch (error) { next(error); }
}

module.exports = { signup };

