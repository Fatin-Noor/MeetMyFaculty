const router = require("express").Router();
const controller = require("../controllers/forumController");
const { protect } = require("../middlewares/authMiddleware");
router.get("/posts", protect, controller.getPosts);
router.post("/posts", protect, controller.createPost);
router.get("/posts/:id", protect, controller.getPost);
router.patch("/posts/:id", protect, controller.updatePost);
router.delete("/posts/:id", protect, controller.deletePost);
router.post("/posts/:id/comments", protect, controller.addComment);
module.exports = router;

