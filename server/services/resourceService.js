const Resource = require("../models/Resource");
const ResourceAccessRequest = require("../models/ResourceAccessRequest");

function getResources(query) {
  const filter = {};
  ["semester", "courseCode", "section", "resourceType"].forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });
  if (query.search) {
    const search = new RegExp(query.search, "i");
    filter.$or = [{ title: search }, { courseName: search }, { courseCode: search }];
  }
  return Resource.find(filter).populate("faculty", "name designation department profilePicture").sort({ semester: -1, createdAt: -1 });
}
const getResource = (id) => Resource.findById(id).populate("faculty", "name designation department");
const createResource = (data) => Resource.create(data);
const updateResource = (id, data) => Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteResource = (id) => Resource.findByIdAndDelete(id);
const getAccess = (student, resource) => ResourceAccessRequest.findOne({ student, resource, status: "approved" });
const findAccessRequest = (student, resource) => ResourceAccessRequest.findOne({ student, resource, status: { $in: ["pending", "approved"] } });
const createAccessRequest = (data) => ResourceAccessRequest.create(data);
const studentAccessRequests = (student) => ResourceAccessRequest.find({ student }).populate("resource", "title courseCode semester resourceType faculty").sort({ createdAt: -1 });
const facultyAccessRequests = (faculty) => ResourceAccessRequest.find().populate({ path: "resource", match: { faculty }, select: "title courseCode semester faculty" }).populate("student", "name email studentId department").sort({ createdAt: -1 });
const getAccessRequest = (id) => ResourceAccessRequest.findById(id).populate("resource");
const updateAccessRequest = (id, data) => ResourceAccessRequest.findByIdAndUpdate(id, data, { new: true, runValidators: true });
module.exports = { getResources, getResource, createResource, updateResource, deleteResource, getAccess, findAccessRequest, createAccessRequest, studentAccessRequests, facultyAccessRequests, getAccessRequest, updateAccessRequest };

