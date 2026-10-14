const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, maxlength: 3000 },
    courseName: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    section: { type: String, trim: true },
    resourceType: { type: String, enum: ["whatsapp", "telegram", "google_drive", "slides", "notes", "assignment", "external_link"], required: true },
    resourceUrl: { type: String, required: true, trim: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isRestricted: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);

