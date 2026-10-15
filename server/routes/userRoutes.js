const router = require("express").Router();
const profileController = require("../controllers/profileController");
const adminController = require("../controllers/adminUserController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.patch("/me", protect, profileController.updateMyProfile);
router.get("/", protect, allowRoles("admin"), adminController.getUsers);
router.get("/:id", protect, allowRoles("admin"), adminController.getUser);
router.patch("/:id", protect, allowRoles("admin"), adminController.updateUser);
router.patch("/:id/status", protect, allowRoles("admin"), adminController.changeStatus);
router.patch("/:id/role", protect, allowRoles("admin"), adminController.changeRole);
module.exports = router;

