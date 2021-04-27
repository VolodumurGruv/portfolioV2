const AppError = require("../utils/error");
const { msgJoiSchema } = require("../models/joiSchema");

const validateSchema = (req, res, next) => {
	const { userName, message, email } = req.body;
	const { error } = msgJoiSchema.validate({ userName, message, email });
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports = validateSchema;
