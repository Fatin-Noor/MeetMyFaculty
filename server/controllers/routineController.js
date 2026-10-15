// Module 2 - Function 5: Class Routine Viewer
// Owner: Fatin Noor Hoque (Member 1)
const routineService = require("../services/routineService");

async function getRoutines(req, res, next) {
  try { const data = await routineService.getRoutines(req.query); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}
async function createRoutine(req, res, next) {
  try { const data = await routineService.createRoutine(req.body); res.status(201).json({ success: true, data }); } catch (error) { next(error); }
}
async function updateRoutine(req, res, next) {
  try { const data = await routineService.updateRoutine(req.params.id, req.body); if (!data) return res.status(404).json({ success: false, message: "Routine not found" }); res.json({ success: true, data }); } catch (error) { next(error); }
}
async function deleteRoutine(req, res, next) {
  try { const data = await routineService.deleteRoutine(req.params.id); if (!data) return res.status(404).json({ success: false, message: "Routine not found" }); res.json({ success: true, message: "Routine deleted" }); } catch (error) { next(error); }
}
module.exports = { getRoutines, createRoutine, updateRoutine, deleteRoutine };
