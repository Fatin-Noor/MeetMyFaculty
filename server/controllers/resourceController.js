// Module 3 - Function 10: Semester Resource Sharing
// Owner: Redoan Hasan Rafin (Member 2)
const resourceService = require("../services/resourceService");

function canManageResource(resource, user) {
  return user.role === "admin" || resource.faculty._id?.equals?.(user._id) || resource.faculty.equals?.(user._id);
}

async function getResources(req, res, next) {
  try {
    const resources = await resourceService.getResources(req.query);
    const data = await Promise.all(resources.map(async (resource) => {
      const item = resource.toObject();
      if (item.isRestricted) {
        const owner = item.faculty?._id?.toString() === req.user._id.toString();
        const approved = req.user.role === "student" && await resourceService.getAccess(req.user._id, item._id);
        if (req.user.role !== "admin" && !owner && !approved) item.resourceUrl = null;
      }
      return item;
    }));
    res.json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
}

async function getResource(req, res, next) {
  try {
    const resource = await resourceService.getResource(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    const data = resource.toObject();
    const owner = resource.faculty._id.equals(req.user._id);
    if (resource.isRestricted && req.user.role === "student") {
      const approved = await resourceService.getAccess(req.user._id, resource._id);
      if (!approved) return res.status(403).json({ success: false, message: "Faculty approval is required to open this resource" });
    }
    if (resource.isRestricted && req.user.role === "faculty" && !owner && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Faculty approval is required to open this resource" });
    }
    res.json({ success: true, data });
  } catch (error) { next(error); }
}

async function createResource(req, res, next) {
  try {
    const { title, courseName, courseCode, semester, resourceType, resourceUrl } = req.body;
    if (!title || !courseName || !courseCode || !semester || !resourceType || !resourceUrl) return res.status(400).json({ success: false, message: "Please complete all required resource fields" });
    const data = await resourceService.createResource({ ...req.body, faculty: req.user._id });
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
}

async function updateResource(req, res, next) {
  try {
    const resource = await resourceService.getResource(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    if (!canManageResource(resource, req.user)) return res.status(403).json({ success: false, message: "You can update only your own resources" });
    const data = await resourceService.updateResource(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) { next(error); }
}

async function deleteResource(req, res, next) {
  try {
    const resource = await resourceService.getResource(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    if (!canManageResource(resource, req.user)) return res.status(403).json({ success: false, message: "You can delete only your own resources" });
    await resourceService.deleteResource(req.params.id);
    res.json({ success: true, message: "Resource deleted" });
  } catch (error) { next(error); }
}
module.exports = { getResources, getResource, createResource, updateResource, deleteResource };

