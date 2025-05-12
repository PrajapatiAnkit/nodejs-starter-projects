const express = require("express");
const { getAllJobs, createJobs } = require("../controllers/jobs.controller");
const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs);
jobsRouter.route("/").post(createJobs);

module.exports = jobsRouter;
