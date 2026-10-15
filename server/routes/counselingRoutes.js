const router = require("express").Router();
const slotBookingController = require("../controllers/slotBookingController");
const managementController = require("../controllers/counselingManagementController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");
router.get("/slots", protect, slotBookingController.getSlots);
router.post("/slots", protect, allowRoles("faculty"), slotBookingController.createSlot);
router.patch("/slots/:id", protect, allowRoles("faculty"), slotBookingController.updateSlot);
router.delete("/slots/:id", protect, allowRoles("faculty"), slotBookingController.deleteSlot);
router.post("/requests", protect, allowRoles("student"), slotBookingController.createRequest);
router.get("/requests/my", protect, allowRoles("student"), slotBookingController.getMyRequests);
router.get("/requests/faculty", protect, allowRoles("faculty"), managementController.getFacultyRequests);
router.patch("/requests/:id", protect, allowRoles("faculty"), managementController.updateRequest);
module.exports = router;

