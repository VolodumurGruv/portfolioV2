if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const AppError = require("./utils/error");

const express = require("express"),
	path = require("path"),
	ejsMate = require("ejs-mate"),
	helmet = require("helmet"),
	session = require("express-session"),
	flash = require("connect-flash"),
	index = require("./routes/index");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: "itwillbesomesecretinthefuture",
		saveUninitialized: true,
		resave: false,
	})
);
app.use(flash());

app.use(helmet());

const fontSrcUrls = [];

app.use(
	helmet(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: [],
				connectSrc: ["'self'"],
				scriptSrc: ["'unsafe-inline'", "'self'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				workerSrc: ["'self'", "blob:"],
				childSrc: ["blob:"],
				objectSrc: [],
				imgSrc: [],
				fontSrc: ["'self'", ...fontSrcUrls],
			},
		})
	)
);

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});
//routers

app.use("/", index);

// handeling with errors
app.all("*", (req, res, next) => {
	next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!";
	res.status(status).render("error", { err });
});

const start = async () => {
	try {
		const port = process.env.PORT || 4200;
		await app.listen(port, () => console.log(`Serve on ${port}`));
	} catch (e) {
		console.log(e);
	}
};

start();
