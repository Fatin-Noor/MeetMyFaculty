const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

function createToken(user) {
  return jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
    subject: user._id.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

async function signup(req, res, next) {
  try {
    const { name, email, password, role, department, phone, studentId, designation } = req.body;
    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({ success: false, message: "Name, email, password, role, and department are required" });
    }
    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({ success: false, message: "Only Student or Faculty can register" });
    }
    if (!email.trim().toLowerCase().endsWith("@diu.edu.bd")) {
      return res.status(400).json({ success: false, message: "Use a valid DIU institutional email address" });
    }
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

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
    const user = await authService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (user.accountStatus !== "approved") return res.status(403).json({ success: false, message: "Your account is not approved or active" });
    res.json({ success: true, message: "Login successful", token: createToken(user), user: authService.publicUser(user) });
  } catch (error) { next(error); }
}

async function getMe(req, res) {
  res.json({ success: true, data: authService.publicUser(req.user) });
}

module.exports = { signup, login, getMe };

