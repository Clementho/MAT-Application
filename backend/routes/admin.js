const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
  authenticateToken,
  authenticateAdminToken,
} = require("../middleware/authMiddleware");

router.get("/getUsers", authenticateToken, adminController.getAllUsers);
router.get("/getBookings", authenticateToken, adminController.getAllBookings);

router.post(
  "/createBooking",
  authenticateAdminToken,
  adminController.createBooking
);

router.patch(
  "/updateBooking/:id",
  authenticateAdminToken,
  adminController.updateBookingbyBookingId
);

router.put(
  "/updateFormStarted/:id",
  authenticateToken,
  adminController.updateFormStarted
);
router.put(
  "/updateIsComplete/:id",
  authenticateToken,
  adminController.updateIsComplete
);

router.delete(
  "/deleteBooking/:id",
  authenticateAdminToken,
  adminController.deleteBooking
);

module.exports = router;
