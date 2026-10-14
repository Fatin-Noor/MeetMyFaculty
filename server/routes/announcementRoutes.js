const router = require("express").Router();
const controller = require("../controllers/announcementController");
const { protect } = require("../middlewares/authMiddleware");
router.get("/", controller.getAnnouncements);
router.post("/", protect, controller.createAnnouncement);
router.patch("/:id", protect, controller.updateAnnouncement);
router.delete("/:id", protect, controller.deleteAnnouncement);
module.exports = router;

