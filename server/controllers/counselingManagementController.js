// Module 2 - Function 7: Counseling Request Management
// Owner: Makib (Member 3)
const counselingService = require("../services/counselingService");

async function getFacultyRequests(req, res, next) {
  try { const data = await counselingService.facultyRequests(req.user._id); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}

async function updateRequest(req, res, next) {
  try {
    const request = await counselingService.getRequest(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Counseling request not found" });
    if (!request.faculty.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can manage only requests sent to you" });
    const { status, alternativeDate, alternativeStartTime, alternativeEndTime, facultyResponse } = req.body;
    if (!["approved", "rejected", "alternative_suggested"].includes(status)) return res.status(400).json({ success: false, message: "Invalid request status" });
    if (status === "alternative_suggested" && (!alternativeDate || !alternativeStartTime || !alternativeEndTime)) return res.status(400).json({ success: false, message: "Alternative date and time are required" });
    const data = await counselingService.updateRequest(req.params.id, { status, alternativeDate, alternativeStartTime, alternativeEndTime, facultyResponse });
    res.json({ success: true, message: "Counseling request updated", data });
  } catch (error) { next(error); }
}

module.exports = { getFacultyRequests, updateRequest };
