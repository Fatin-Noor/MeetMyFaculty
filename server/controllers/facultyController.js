const facultyService = require("../services/facultyService");

async function getFaculty(req, res, next) {
  try { const data = await facultyService.getFaculty(req.query); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}
async function getFacultyById(req, res, next) {
  try { const data = await facultyService.getFacultyById(req.params.id); if (!data) return res.status(404).json({ success: false, message: "Faculty member not found" }); res.json({ success: true, data }); } catch (error) { next(error); }
}
module.exports = { getFaculty, getFacultyById };
