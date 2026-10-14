const CounselingSlot = require("../models/CounselingSlot");
const CounselingRequest = require("../models/CounselingRequest");

function getSlots(query) {
  const filter = {};
  if (query.faculty) filter.faculty = query.faculty;
  if (query.available === "true") filter.isBooked = false;
  return CounselingSlot.find(filter).populate("faculty", "name designation department profilePicture").sort({ date: 1, startTime: 1 });
}
const getSlot = (id) => CounselingSlot.findById(id);
const createSlot = (data) => CounselingSlot.create(data);
const updateSlot = (id, data) => CounselingSlot.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteSlot = (id) => CounselingSlot.findByIdAndDelete(id);
const claimSlot = (id) => CounselingSlot.findOneAndUpdate({ _id: id, isBooked: false }, { isBooked: true }, { new: true });
const releaseSlot = (id) => CounselingSlot.findByIdAndUpdate(id, { isBooked: false }, { new: true });
const createRequest = (data) => CounselingRequest.create(data);
const studentRequests = (student) => CounselingRequest.find({ student }).populate("faculty", "name designation department email").populate("slot").sort({ createdAt: -1 });
const facultyRequests = (faculty) => CounselingRequest.find({ faculty }).populate("student", "name email studentId department phone").populate("slot").sort({ createdAt: -1 });
const getRequest = (id) => CounselingRequest.findById(id);
const updateRequest = (id, data) => CounselingRequest.findByIdAndUpdate(id, data, { new: true, runValidators: true });
module.exports = { getSlots, getSlot, createSlot, updateSlot, deleteSlot, claimSlot, releaseSlot, createRequest, studentRequests, facultyRequests, getRequest, updateRequest };

