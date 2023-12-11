var express = require("express");
var router = express.Router();
const taskController = require("../../controllers/task/taskController");
const authMiddleware = require("../../middleware/authMiddleware");
const {
  taskValidation,
  updateTaskStatusValidation,
} = require("../../validations/Task/taskValidations");

router
  .route("/")
  .post(
    taskValidation,
    helper.validate,
    authMiddleware,
    taskController.addTask
  );
router.route("/:task_id").get(authMiddleware, taskController.getTask);
router.route("/").get(authMiddleware, taskController.getTasks);
router
  .route("/")
  .put(
    [...taskValidation, ...updateTaskStatusValidation],
    helper.validate,
    authMiddleware,
    taskController.updateTask
  );

router
  .route("/update-status")
  .put(
    updateTaskStatusValidation,
    helper.validate,
    authMiddleware,
    taskController.updateTask
  );
router.route("/:task_id").delete(authMiddleware, taskController.deleteTask);

module.exports = {
  router: router,
  basePath: "task",
};
