if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const AppError = require("./utils/error");

const express = require("express"),
	mongoose = require("mongoose"),
	path = require("path"),
	ejsMate = require("ejs-mate"),
	helmet = require("helmet"),
	session = require("express-session"),
	flash = require("connect-flash"),
	mongoSanitize = require("express-mongo-sanitize"),
	MongoStore = require("connect-mongo")(session),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	index = require("./routes/index");

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
	mongoSanitize({
		replaceWith: "_",
	})
);

app.use(
	session({
		secret: "itwillbesomesecret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: true,
		},
	})
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.post = req.flash("success");
	res.locals.nameErr = req.flash("error");
	next();
});

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});
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
