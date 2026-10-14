const resourceService = require("../services/resourceService");

async function createAccessRequest(req, res, next) {
  try {
    const { resourceId, studentId, department, semester, section } = req.body;
    if (!resourceId || !studentId || !department || !semester || !section) return res.status(400).json({ success: false, message: "Complete all verification fields" });
    const resource = await resourceService.getResource(resourceId);
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    if (!resource.isRestricted) return res.status(400).json({ success: false, message: "This resource does not require approval" });
    const existing = await resourceService.findAccessRequest(req.user._id, resourceId);
    if (existing) return res.status(409).json({ success: false, message: `An access request is already ${existing.status}` });
    const data = await resourceService.createAccessRequest({ student: req.user._id, resource: resourceId, studentId, department, semester, section });
    res.status(201).json({ success: true, message: "Resource access request submitted", data });
  } catch (error) { next(error); }
}
async function getMyAccessRequests(req, res, next) {
  try { const data = await resourceService.studentAccessRequests(req.user._id); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}
async function getFacultyAccessRequests(req, res, next) {
  try {
    const requests = await resourceService.facultyAccessRequests(req.user._id);
    const data = requests.filter((request) => request.resource);
    res.json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
}
async function updateAccessRequest(req, res, next) {
  try {
    const request = await resourceService.getAccessRequest(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Access request not found" });
    if (!request.resource.faculty.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can review only requests for your resources" });
    const { status, facultyResponse } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ success: false, message: "Status must be approved or rejected" });
    const data = await resourceService.updateAccessRequest(req.params.id, { status, facultyResponse, reviewedBy: req.user._id });
    res.json({ success: true, message: "Access request updated", data });
  } catch (error) { next(error); }
}
module.exports = { createAccessRequest, getMyAccessRequests, getFacultyAccessRequests, updateAccessRequest };

