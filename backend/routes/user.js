const express = require("express");
const {
  authenticateToken,
  authenticateAdminToken,
} = require("../middleware/authMiddleware");

const {
  loginUser,
  signupUser,
  getProfile,
  updateProfile,
  svrForgotPassword,
  svrResetPassword,
  svrResetPasswordSave,
  getBookingsByTherapistId,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/bookings/:therapistId", getBookingsByTherapistId);
router.get(
  "/profile/:username",
  authenticateToken,
  getProfile
);

router.post("/login", loginUser);
router.post("/signUp", authenticateAdminToken, signupUser);
router.post("/svrForgotPassword", svrForgotPassword);
router.post("/successEmail");
router.post("/svrResetPassword/:token", svrResetPassword);
router.post("/svrResetPasswordSave", svrResetPasswordSave);
router.post("/successPasswordChanged");

router.patch("/profile/:username", authenticateToken, updateProfile);

module.exports = router;
