// Module 2 - Function 6: Counseling Request and Slot Booking
// Owner: Redoan Hasan Rafin (Member 2)
const counselingService = require("../services/counselingService");

async function getSlots(req, res, next) {
  try { const data = await counselingService.getSlots(req.query); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}

async function createSlot(req, res, next) {
  try {
    const { date, startTime, endTime } = req.body;
    if (!date || !startTime || !endTime) return res.status(400).json({ success: false, message: "Date, start time, and end time are required" });
    const data = await counselingService.createSlot({ faculty: req.user._id, date, startTime, endTime });
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
}

async function updateSlot(req, res, next) {
  try {
    const slot = await counselingService.getSlot(req.params.id);
    if (!slot) return res.status(404).json({ success: false, message: "Counseling slot not found" });
    if (!slot.faculty.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can update only your own slots" });
    if (slot.isBooked) return res.status(400).json({ success: false, message: "Booked slots cannot be changed" });
    const data = await counselingService.updateSlot(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) { next(error); }
}

async function deleteSlot(req, res, next) {
  try {
    const slot = await counselingService.getSlot(req.params.id);
    if (!slot) return res.status(404).json({ success: false, message: "Counseling slot not found" });
    if (!slot.faculty.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can delete only your own slots" });
    if (slot.isBooked) return res.status(400).json({ success: false, message: "Booked slots cannot be deleted" });
    await counselingService.deleteSlot(req.params.id);
    res.json({ success: true, message: "Counseling slot deleted" });
  } catch (error) { next(error); }
}

async function createRequest(req, res, next) {
  try {
    const { slotId, reason } = req.body;
    if (!slotId || !reason?.trim()) return res.status(400).json({ success: false, message: "Slot and reason are required" });
    const slot = await counselingService.claimSlot(slotId);
    if (!slot) return res.status(409).json({ success: false, message: "This slot is no longer available" });
    try {
      const data = await counselingService.createRequest({ student: req.user._id, faculty: slot.faculty, slot: slot._id, reason: reason.trim() });
      return res.status(201).json({ success: true, message: "Counseling request submitted", data });
    } catch (error) {
      await counselingService.releaseSlot(slot._id);
      throw error;
    }
  } catch (error) { next(error); }
}

async function getMyRequests(req, res, next) {
  try { const data = await counselingService.studentRequests(req.user._id); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}

module.exports = { getSlots, createSlot, updateSlot, deleteSlot, createRequest, getMyRequests };
