const router = require("express").Router();
const controller = require("../controllers/routineController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.get("/", protect, controller.getRoutines);
router.post("/", protect, allowRoles("admin"), controller.createRoutine);
router.patch("/:id", protect, allowRoles("admin"), controller.updateRoutine);
router.delete("/:id", protect, allowRoles("admin"), controller.deleteRoutine);
module.exports = router;

