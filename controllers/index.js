if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const catchAsync = require("../utils/catchAsync"),
	msgSchema = require("../models/message"),
	setData = require("../utils/date"),
	// mailgun for sending an email
	API_KEY = process.env.API_KEY,
	DOMAIN = process.env.DOMAIN,
	mailgun = require("mailgun-js")({
		apiKey: API_KEY,
		domain: DOMAIN,
	});

// nodemailer for sending an email
const nodemailer = require("nodemailer");

module.exports.index = (req, res) => {
	res.render("index");
};

module.exports.popup = (req, res) => {
	res.render("popup");
};

module.exports.message = catchAsync(async (req, res, next) => {
	const { userName, message, email } = req.body;

	const date = new Date();
	console.log(date);
	const msgs = new msgSchema({ userName, message, email, date });
	const msg = {
		from: `${userName} <${email}>`,
		to: process.env.EMAIL,
		subject: "Portfolio",
		text: `${message} it was sent ${date}`,
	};

	await mailgun.messages().send(msg, function (error, body) {
		if (error) {
			req.flash("error", error);
		}
		console.log(body);
	});

	await msgs.save();
	req.flash("success", "Message was created");
	res.redirect("/");
});
