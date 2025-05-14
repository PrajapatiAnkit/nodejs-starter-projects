const JobsSchema = require("../models/jobs.model");
const { StatusCodes } = require("http-status-codes");

const jobService = require("../services/jobs.service");

const getAllJobs = async (req, res) => {
  try {
    const authUser = req.authUser;
    const jobs = await jobService.getAllJobs(authUser);
    return res.send({ data: jobs });
  } catch (error) {
    console.log("getAllJobsError", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const createJobs = async (req, res) => {
  const { name, company } = req.body;
  const authUser = req.authUser;
  try {
    const job = await jobService.createJobs(name, company, authUser);
    return res.status(StatusCodes.CREATED).json({ message: "Job created successfully", data: job });
  } catch (error) {
    console.log("createJobsError", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  createJobs,
};
