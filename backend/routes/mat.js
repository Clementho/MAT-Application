const express = require("express");
const matController = require("../controllers/matController");
const {
  authenticateToken,
  authenticateAdminToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/matUpload", authenticateToken, matController.uploadMAT);
router.get(
  "/matRetrieve/:recordID",
  authenticateToken,
  matController.retrieveMAT
);
router.get(
  "/matDownload/:recordID",
  authenticateToken,
  matController.createMATPDF
);
router.patch(
  "/matUpdate/:recordID",
  authenticateToken,
  matController.updateMAT
);
router.get("/matGetAll", authenticateToken, matController.getAllMat);
router.delete(
  "/matDelete/:recordID",

  matController.deleteMat
);
router.post(
  "/matDeleted/:recordID",

  matController.postDeletedMat
);
router.post(
  "/restoreDeletedMat/:recordID",

  matController.restoreDeletedMat
);
router.get(
  "/deletedMatsGetAll",

  matController.getAllDeletedMats
);
router.get(
  "/deletedMatGetById/:recordID",

  matController.getDeletedMatById
);
router.get(
  "/archivedMatDownload/:recordID",
  matController.createArchivedMATPDF
)

module.exports = router;
