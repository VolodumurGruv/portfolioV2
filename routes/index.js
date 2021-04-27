const express = require("express"),
  router = express.Router(),
  portfolio = require("../controllers/index"),
  validateSchema = require("../middlewares/joiValidation");

router.route("/").get(portfolio.index);

router
  .route("/popup")
  .get(portfolio.popup)
  .post(validateSchema, portfolio.message);
module.exports = router;
