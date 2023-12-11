var express = require("express");
var router = express.Router();
const accountController = require("../../controllers/account/accountController");
const authMiddleware = require("../../middleware/authMiddleware");
const {
  loginValidation,
  signUpValidation,
} = require("../../validations/Account/accountValidation");
router
  .route("/login")
  .post(loginValidation, helper.validate, accountController.login);
router
  .route("/")
  .post(signUpValidation, helper.validate, accountController.addUser);
router.route("/").get(authMiddleware, accountController.getUsers);
router
  .route("/:user_id")
  .get(helper.validate, authMiddleware, accountController.getUser);
router.route("/").put(authMiddleware, accountController.updateUser);
router
  .route("/:user_id")
  .delete(helper.validate, authMiddleware, accountController.deleteUser);

module.exports = {
  router: router,
  basePath: "account",
};
