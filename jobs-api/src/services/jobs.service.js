const JobsSchema = require("../models/jobs.model");

const getAllJobs = async (authUser) => {
  return await JobsSchema.find({ userId: authUser.userId })
    .select("_id name company createdA updatedAt")
    .sort("-createdAt");
};

const createJobs = async (name, company, authUser) => {
  return await JobsSchema.create({
    name,
    company,
    userId: authUser.userId,
  });
};

module.exports = { getAllJobs, createJobs };
