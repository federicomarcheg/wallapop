const express = require("express");
const AdController = require("../controllers/adController");

const router = express.Router();

router.get("/", AdController.getAllAds);
router.post("/", AdController.createAd);
router.get("/:id", AdController.getAdById);
router.put("/:id", AdController.updateAd);

module.exports = router;
