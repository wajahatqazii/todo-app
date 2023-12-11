const config = require("../../config/appConfig");
const Account = require("../models/accounts");
/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports = async (req, res, next) => {
  try {
    helper.setAndGetRequestObject.setRequest(req);
    // check header or url parameters or post parameters for token
    let token =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.headers["Authorization"];
    if (token) {
      req.tokenForExternalServices = token;
      // verifies secret and checks expiry
      req.originalToken = token;
      let decoded = await helper.jwt.verifyJWT(token);
      let response = await Account.findOne({
        _id: decoded.user._id,
      }).lean();
      if (response) {
        req.user = {
          ...response,
          authUserId: response?._id,
        };
        req.authUserId = response?._id;
        // delete req.user?.authUserId;
        next();
      } else {
        return res.status(config.STATUS_CODES.UNAUTHORIZED).send({
          success: false,
          message: "Unauthorized!",
        });
      }
    } else {
      // if there is no token return an error
      return res.status(config.STATUS_CODES.UNAUTHORIZED).send({
        success: false,
        message: "Unauthorized!",
      });
    }
  } catch (err) {
    return res.status(config.STATUS_CODES.UNAUTHORIZED).send({
      success: false,
      message: "Unauthorized!",
    });
  }
};
