const router = require("express").Router();
const controller = require("../controllers/facultyController");
const { protect } = require("../middlewares/authMiddleware");
router.get("/", controller.getFaculty);
router.get("/:id", protect, controller.getFacultyById);
module.exports = router;
