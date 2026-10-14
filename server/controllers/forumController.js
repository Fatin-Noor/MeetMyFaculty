const forumService = require("../services/forumService");

async function getPosts(req, res, next) {
  try { const data = await forumService.getPosts(req.query); res.json({ success: true, count: data.length, data }); } catch (error) { next(error); }
}
async function getPost(req, res, next) {
  try { const data = await forumService.getPost(req.params.id); if (!data) return res.status(404).json({ success: false, message: "Forum post not found" }); res.json({ success: true, data }); } catch (error) { next(error); }
}
async function createPost(req, res, next) {
  try {
    const { title, description, category } = req.body;
    if (!title?.trim() || !description?.trim()) return res.status(400).json({ success: false, message: "Title and description are required" });
    const data = await forumService.createPost({ title, description, category, author: req.user._id });
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
}
async function updatePost(req, res, next) {
  try {
    const post = await forumService.getPost(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Forum post not found" });
    if (req.user.role !== "admin" && !post.author._id.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can edit only your own posts" });
    const data = await forumService.updatePost(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) { next(error); }
}
async function deletePost(req, res, next) {
  try {
    const post = await forumService.getPost(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Forum post not found" });
    if (req.user.role !== "admin" && !post.author._id.equals(req.user._id)) return res.status(403).json({ success: false, message: "You can delete only your own posts" });
    await forumService.deletePost(req.params.id);
    res.json({ success: true, message: "Forum post deleted" });
  } catch (error) { next(error); }
}
async function addComment(req, res, next) {
  try {
    if (!req.body.content?.trim()) return res.status(400).json({ success: false, message: "Comment cannot be empty" });
    const data = await forumService.addComment(req.params.id, { user: req.user._id, content: req.body.content.trim() });
    if (!data) return res.status(404).json({ success: false, message: "Forum post not found" });
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
}
module.exports = { getPosts, getPost, createPost, updatePost, deletePost, addComment };
