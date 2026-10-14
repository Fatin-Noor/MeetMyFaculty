const router = require("express").Router();
const controller = require("../controllers/counselingController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.get("/slots", protect, controller.getSlots);
router.post("/slots", protect, allowRoles("faculty"), controller.createSlot);
router.patch("/slots/:id", protect, allowRoles("faculty"), controller.updateSlot);
router.delete("/slots/:id", protect, allowRoles("faculty"), controller.deleteSlot);
router.post("/requests", protect, allowRoles("student"), controller.createRequest);
router.get("/requests/my", protect, allowRoles("student"), controller.getMyRequests);
router.get("/requests/faculty", protect, allowRoles("faculty"), controller.getFacultyRequests);
router.patch("/requests/:id", protect, allowRoles("faculty"), controller.updateRequest);
module.exports = router;

