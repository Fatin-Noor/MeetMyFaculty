const router = require("express").Router();
const controller = require("../controllers/resourceAccessController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.post("/", protect, allowRoles("student"), controller.createAccessRequest);
router.get("/my", protect, allowRoles("student"), controller.getMyAccessRequests);
router.get("/faculty", protect, allowRoles("faculty"), controller.getFacultyAccessRequests);
router.patch("/:id", protect, allowRoles("faculty"), controller.updateAccessRequest);
module.exports = router;

