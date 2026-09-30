const express = require("express");
const jobController = require("../controllers/job.controller");
const {validateJob,validateJobUpdate} = require("../middleware/validation.middleware");

const router = express.Router();    

router.get("/",jobController.getAllJobs);
router.get("/:id",jobController.getJobById);
router.post("/",validateJob,jobController.createJob);
router.patch("/:id",validateJobUpdate,jobController.updateJob);
router.delete("/:id",jobController.deleteJob);

module.exports =router;