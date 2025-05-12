const JobsSchema = require("../models/jobs.model");

const getAllJobs = (req, res) => {
  res.send({ data: [] });
};

const createJobs = async (req, res) => {
  const { name, company } = req.body;
  const job = await JobsSchema.create({ name, company });
  return res.status(201).json(job);
};
module.exports = {
  getAllJobs,
  createJobs,
};
