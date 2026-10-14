const Announcement = require("../models/Announcement");

function getAnnouncements(query, includeUnpublished) {
  const filter = includeUnpublished ? {} : { isPublished: true };
  if (query.category) filter.category = query.category;
  if (query.search) {
    const search = new RegExp(query.search, "i");
    filter.$or = [{ title: search }, { description: search }];
  }
  return Announcement.find(filter).populate("author", "name role department profilePicture").sort({ createdAt: -1 });
}
const getAnnouncement = (id) => Announcement.findById(id);
const createAnnouncement = (data) => Announcement.create(data);
const updateAnnouncement = (id, data) => Announcement.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteAnnouncement = (id) => Announcement.findByIdAndDelete(id);
module.exports = { getAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement };

