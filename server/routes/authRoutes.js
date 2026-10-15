const router = require("express").Router();
const { signup } = require("../controllers/registrationController");
const { login, getMe } = require("../controllers/authenticationController");
const { protect } = require("../middlewares/authMiddleware");
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
module.exports = router;

