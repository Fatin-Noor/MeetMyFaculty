const router = require("express").Router();
const controller = require("../controllers/resourceController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.get("/", protect, controller.getResources);
router.get("/:id", protect, controller.getResource);
router.post("/", protect, allowRoles("faculty"), controller.createResource);
router.patch("/:id", protect, allowRoles("faculty", "admin"), controller.updateResource);
router.delete("/:id", protect, allowRoles("faculty", "admin"), controller.deleteResource);
module.exports = router;

