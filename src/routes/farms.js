// for server
const express = require("express");

const router = express.Router();

// export controller
const FarmController = require("../controller/farms.js");

// CREATE - POST
router.post("/", FarmController.createNewFarm);

// READ - GET
router.get("/", FarmController.getAllFarms);

// UPDATE - PATCH
router.patch("/:idFarm", FarmController.updateFarm);

// DELETE - DELETE
router.delete("/:idFarm", FarmController.deleteFarm);

module.exports = router;
