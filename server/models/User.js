const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "faculty", "student"], required: true },
    accountStatus: { type: String, enum: ["pending", "approved", "rejected", "inactive"], default: "pending" },
    department: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    profilePicture: { type: String, trim: true },
    studentId: { type: String, trim: true },
    designation: { type: String, trim: true },
    faculty: { type: String, trim: true },
    personalWebpage: { type: String, trim: true },
    academicQualifications: { type: String, trim: true },
    trainingExperience: { type: String, trim: true },
    teachingExperience: { type: String, trim: true },
    researchInterests: { type: String, trim: true },
    publications: { type: String, trim: true },
    awardsAndScholarships: { type: String, trim: true },
    previousEmployment: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

