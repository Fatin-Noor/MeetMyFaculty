const router = require("express").Router();
const controller = require("../controllers/userController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.patch("/me", protect, controller.updateMyProfile);
router.get("/", protect, allowRoles("admin"), controller.getUsers);
router.get("/:id", protect, allowRoles("admin"), controller.getUser);
router.patch("/:id", protect, allowRoles("admin"), controller.updateUser);
router.patch("/:id/status", protect, allowRoles("admin"), controller.changeStatus);
router.patch("/:id/role", protect, allowRoles("admin"), controller.changeRole);
module.exports = router;

