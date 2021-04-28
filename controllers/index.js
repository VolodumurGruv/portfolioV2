if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const catchAsync = require("../utils/catchAsync"),
	// mailgun for sending an email
	API_KEY = process.env.API_KEY,
	DOMAIN = process.env.DOMAIN,
	mailgun = require("mailgun-js")({
		apiKey: API_KEY,
		domain: DOMAIN,
	});

module.exports.index = (req, res) => {
	res.render("index");
};

module.exports.popup = (req, res) => {
	res.render("popup");
};

module.exports.message = catchAsync(async (req, res, next) => {
	const { userName, message, email } = req.body;

	const date = new Date();

	const msg = {
		from: `${userName} <${email}>`,
		to: process.env.EMAIL,
		subject: "Portfolio",
		text: `${message} it was sent ${date}`,
	};

	await mailgun.messages().send(msg, function (error, body) {
		if (error) {
			console.log("error", error);
		}
		console.log(body);
	});

	req.flash("success");
	res.redirect("/");
});
