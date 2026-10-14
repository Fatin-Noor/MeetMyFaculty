const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    department: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    batch: { type: String, trim: true },
    courseCode: { type: String, required: true, trim: true },
    courseTitle: { type: String, required: true, trim: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    classroom: { type: String, required: true, trim: true },
    day: { type: String, required: true, trim: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Routine", routineSchema);

