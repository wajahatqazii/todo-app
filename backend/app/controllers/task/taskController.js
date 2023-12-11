const taskService = require("../../services/task/taskServices");

module.exports = {
  addTask: async (req, res) => {
    try {
      const body = { ...req.body };
      const newTask = await taskService.addTask(body);
      if (newTask)
        return helper.apiResponse(
          res,
          false,
          "Task Created Successfully",
          newTask
        );
      return helper.apiResponse(
        res,
        true,
        "Task Not Created Successfully",
        null
      );
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await taskService.getTasks();
      if (tasks && tasks?.length > 0)
        return helper.apiResponse(
          res,
          false,
          "Tasks Fetch Successfully",
          tasks
        );
      return helper.apiResponse(
        res,
        true,
        "Tasks Not Fetch Successfully",
        null
      );
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },

  getTask: async (req, res) => {
    try {
      const body = {
        ...req.params,
      };
      const task = await taskService.getTask(body);
      if (task)
        return helper.apiResponse(res, false, "Task Fetch Successfully", task);
      return helper.apiResponse(res, true, "Task Not Fetch Successfully", null);
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },

  updateTask: async (req, res) => {
    try {
      const body = {
        ...req.body,
      };
      const updatedTask = await taskService.updateTask(body);
      if (updatedTask)
        return helper.apiResponse(
          res,
          false,
          "Task Updated Successfully",
          updatedTask
        );
      return helper.apiResponse(res, true, "Task Not Found", null);
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const body = {
        ...req.body,
      };
      const updatedTask = await taskService.updateTaskStatus(body);
      if (updatedTask)
        return helper.apiResponse(
          res,
          false,
          "Task Updated Successfully",
          updatedTask
        );
      return helper.apiResponse(res, true, "Task Not Found", null);
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const body = {
        ...req.params,
        authAccount: req.authUserId,
      };
      const deletedTask = await taskService.deleteTask(body);
      if (deletedTask)
        return helper.apiResponse(
          res,
          false,
          "Task Deleted Successfully",
          deletedTask
        );
      return helper.apiResponse(res, true, "Task Not Found", null);
    } catch (err) {
      const statusCode = err.status || "INTERNAL_SERVER_ERROR";
      return helper.apiResponse(res, true, err.message, null, statusCode);
    }
  },
};
