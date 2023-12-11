const Task = require("../../models/tasks");
const ObjectId = require("mongoose").Types.ObjectId;

const error = new Error();
error.status = "NOT_FOUND";
error.message = null;
error.data = null;

const taskService = {
  addTask: async (body) => {
    const { title, description, status, authUserId } = body;

    const taskExist = Task.findOne({ title });
    if (!taskExist) {
      const addTask = new Task({
        description,
        title,
        status,
        Account: authUserId,
      });
      return await addTask.save();
    } else {
      error.status = "VALIDATION_ERR";
      error.message = `Task Not Created (Title Already Exist)`;
      throw error;
    }
  },

  getTasks: async (body) => {
    const { authUserId } = body;
    return await Task.findAll({ Account: authUserId }).lean();
  },

  getTask: async (body) => {
    const { task_id } = body;
    return await Task.findOne({
      _id: new ObjectId(task_id),
    }).lean();
  },

  updateTask: async (body) => {
    const { title, description, status, task_id, authUserId } = body;
    const getTask = await Task.findById({ _id: task_id });
    if (getTask) {
      return Task.findByIdAndUpdate(
        { _id: task_id },
        { title, description, status, updatedBy: authUserId },
        { new: true }
      );
    }

    error.status = "BAD_REQUEST";
    error.message = `Task Not Found`;
    throw error;
  },

  updateTaskStatus: async (body) => {
    const { status, task_id, authUserId } = body;
    const getTask = await Task.findById({ _id: task_id });
    if (getTask) {
      return Task.findByIdAndUpdate(
        { _id: task_id },
        { status, updatedBy: authUserId },
        { new: true }
      );
    }

    error.status = "BAD_REQUEST";
    error.message = `Task Not Found`;
    throw error;
  },

  deleteTask: async (body) => {
    const { task_id } = body;
    return Task.findByIdAndUpdate({ _id: task_id });
  },
};

module.exports = taskService;
