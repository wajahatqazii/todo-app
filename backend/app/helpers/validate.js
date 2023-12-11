const { validationResult } = require("express-validator");

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return helper.apiResponse(
    res,
    true,
    extractedErrors,
    null,
    "VALIDATION_ERR",
    true
  );
};
