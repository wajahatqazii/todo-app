const { body } = require("express-validator");
const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter email")
    .bail()
    .isEmail()
    .withMessage("Email format is invalid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .bail()
    .matches(/^[a-zA-Z0-9]{3,30}$/)
    .withMessage("Please enter valid password"),
];

const signUpValidation = [
  ...loginValidation,
  body("first_name").trim().notEmpty().withMessage("Please enter first name"),
  body("last_name").trim().notEmpty().withMessage("Please enter last name"),
  body("gender").trim().notEmpty().withMessage("Please select gender"),
];

module.exports = {
  loginValidation,
  signUpValidation,
};
