const { body } = require("express-validator");

const taskValidation = [
  body("title").trim().notEmpty().withMessage("Please enter task title"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Please enter task description"),
];

const updateTaskStatusValidation = [
  body("status").trim().notEmpty().withMessage("Please select task status"),
  body("task_id").trim().notEmpty().withMessage("Please enter task id"),
];

module.exports = {
  taskValidation,
  updateTaskStatusValidation,
};
