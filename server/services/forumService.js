const ForumPost = require("../models/ForumPost");

function getPosts(query) {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.search) {
    const search = new RegExp(query.search, "i");
    filter.$or = [{ title: search }, { description: search }];
  }
  return ForumPost.find(filter).populate("author", "name role department profilePicture").sort({ createdAt: -1 });
}
const getPost = (id) => ForumPost.findById(id).populate("author", "name role department profilePicture").populate("comments.user", "name role profilePicture");
const createPost = (data) => ForumPost.create(data);
const updatePost = (id, data) => ForumPost.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deletePost = (id) => ForumPost.findByIdAndDelete(id);
async function addComment(id, comment) {
  const post = await ForumPost.findById(id);
  if (!post) return null;
  post.comments.push(comment);
  await post.save();
  return getPost(post._id);
}
module.exports = { getPosts, getPost, createPost, updatePost, deletePost, addComment };

