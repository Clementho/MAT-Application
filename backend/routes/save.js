const express = require("express");
const router = express.Router();
const saveController = require("../controllers/saveController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Route for auto-saving MAT records
router.post(
  "/autoSave/:bookingID",
  authenticateToken,
  saveController.autoSaveMAT
);
router.get("/getSave/:bookingID", authenticateToken, saveController.getSaveMAT);
router.delete(
  "/deleteSave/:bookingID",
  authenticateToken,
  saveController.deleteSaveMAT
);

module.exports = router;
