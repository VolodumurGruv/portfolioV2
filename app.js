if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const AppError = require("./utils/error");

const express = require("express"),
	path = require("path"),
	ejsMate = require("ejs-mate"),
	flash = require("connect-flash"),
	helmet = require("helmet"),
	session = require("express-session"),
	mongoose = require("mongoose"),
	index = require("./routes/index");
const MongoStore = require("connect-mongo");

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("MongoDB was connected!");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(helmet());

const store = MongoStore.create({
	mongoUrl: dbUrl,
});

app.use(
	session({
		secret: "temporary secret word",
		store,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: true,
			maxAge: 12 * 60 * 60,
		},
	})
);

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
	res.locals.post = req.flash("success");
	res.locals.nameErr = req.flash("error");
	next();
});

//flash success
app.use((req, res, next) => {
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
