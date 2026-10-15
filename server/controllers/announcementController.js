// Module 2 - Function 8: Announcement Management
// Owner: Redoan Hasan Rafin (Member 2)
const announcementService = require("../services/announcementService");

async function getAnnouncements(req, res, next) {
  try {
    const includeUnpublished = req.user?.role === "admin";
    const data = await announcementService.getAnnouncements(req.query, includeUnpublished);
    res.json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
}

async function createAnnouncement(req, res, next) {
  try {
    const { title, description, category, attachmentUrl, isPublished } = req.body;
    if (!title?.trim() || !description?.trim()) return res.status(400).json({ success: false, message: "Title and description are required" });
    const data = await announcementService.createAnnouncement({ title, description, category, attachmentUrl, isPublished, author: req.user._id });
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
}

async function updateAnnouncement(req, res, next) {
  try {
    const announcement = await announcementService.getAnnouncement(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: "Announcement not found" });
    if (req.user.role !== "admin" && !announcement.author.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can update only your own announcements" });
    const data = await announcementService.updateAnnouncement(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) { next(error); }
}

async function deleteAnnouncement(req, res, next) {
  try {
    const announcement = await announcementService.getAnnouncement(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: "Announcement not found" });
    if (req.user.role !== "admin" && !announcement.author.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can delete only your own announcements" });
    await announcementService.deleteAnnouncement(req.params.id);
    res.json({ success: true, message: "Announcement deleted" });
  } catch (error) { next(error); }
}
module.exports = { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };

