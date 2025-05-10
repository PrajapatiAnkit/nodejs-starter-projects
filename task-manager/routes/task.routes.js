const express = require("express");
const taskRouter = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controller");

taskRouter.route("/").get(getAllTasks);
taskRouter.route("/").post(createTask);
taskRouter.route("/:id").get(getTask);
taskRouter.route("/:id").delete(deleteTask);
taskRouter.route("/:id").patch(updateTask);

taskRouter.route("/").get(getAllTasks);

module.exports = taskRouter;
