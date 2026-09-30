const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/",authMiddleware,applicationController.createApplication);

router.get("/my",authMiddleware,applicationController.getMyApplications);

module.exports = router;