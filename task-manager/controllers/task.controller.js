const asyncHandler = require("../middleware/async-handler.middleware");
const TaskModel = require("../models/task.model");
const isMongoseIdValid = require("../utils/helper.utils");

const getAllTasks1 = async (req, res) => {
  try {
    const allTasks = await TaskModel.find();
    return res.status(200).send(allTasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await TaskModel.find();
  return res.status(200).send(allTasks);
});

const getTask = async (req, res) => {
  const id = req.params.id;
  if (!isMongoseIdValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  try {
    const task = await TaskModel.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  if (!isMongoseIdValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  try {
    // await TaskModel.findByIdAndDelete(req.params.id); // works only with id
    const result = await TaskModel.findOneAndDelete({ _id: id }); // works with id as well other filters
    if (!result) {
      return res.status(400).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!isMongoseIdValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  try {
    const task = await TaskModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(400).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task Updated", task });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
};
