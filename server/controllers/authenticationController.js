// Module 1 - Function 2: Secure Login and Role-Based Access
// Owner: Redoan Hasan Rafin (Member 2)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

function createToken(user) {
  return jwt.sign({ role: user.role }, process.env.JWT_SECRET, { subject: user._id.toString(), expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
    const user = await authService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
    if (user.accountStatus !== "approved") return res.status(403).json({ success: false, message: "Your account is not approved or active" });
    res.json({ success: true, message: "Login successful", token: createToken(user), user: authService.publicUser(user) });
  } catch (error) { next(error); }
}

async function getMe(req, res) { res.json({ success: true, data: authService.publicUser(req.user) }); }
module.exports = { login, getMe };

