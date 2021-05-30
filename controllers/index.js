if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const TelegramApi = require("node-telegram-bot-api");
const catchAsync = require("../utils/catchAsync");
const HEROKU_BOT = process.env.HEROKU_BOT;

module.exports.index = (req, res) => {
	res.render("index");
};

module.exports.popup = (req, res) => {
	res.render("popup");
};

module.exports.message = catchAsync(async (req, res, next) => {
	const bot = new TelegramApi(HEROKU_BOT, { polling: true });

	bot.setMyCommands([{ command: "/check", description: "Check incoming msg" }]);

	const { userName, email, message } = req.body;

	await bot.on("message", (msg) => {
		bot.sendMessage(
			msg.chat.id,
			`from: ${email}, username: ${userName}, message: ${message}`
		);
	});
	req.flash("success");
	res.redirect("/");
});

//mailgun was turned off
// const catchAsync = require("../utils/catchAsync"),
// mailgun for sending an email
// 	API_KEY = process.env.API_KEY,
// 	DOMAIN = process.env.DOMAIN,
// 	mailgun = require("mailgun-js")({
// 		apiKey: API_KEY,
// 		domain: DOMAIN,
// 	});

// module.exports.message = catchAsync(async (req, res, next) => {
// 	const { userName, message, email } = req.body;

// 	const date = new Date();

// 	const msg = {
// 		from: `${userName} <${email}>`,
// 		to: process.env.EMAIL,
// 		subject: "Portfolio",
// 		text: `${message} it was sent ${date}`,
// 	};

// 	await mailgun.messages().send(msg, function (error, body) {
// 		if (error) {
// 			console.log("error", error);
// 		}
// 		console.log(body);
// 	});

// 	req.flash("success");
// 	res.redirect("/");
// });
