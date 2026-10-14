const mongoose = require("mongoose");

const counselingRequestSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "CounselingSlot", required: true, unique: true },
    reason: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["pending", "approved", "rejected", "alternative_suggested"], default: "pending" },
    alternativeDate: Date,
    alternativeStartTime: String,
    alternativeEndTime: String,
    facultyResponse: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CounselingRequest", counselingRequestSchema);

