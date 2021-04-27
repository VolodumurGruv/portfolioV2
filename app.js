const AppError = require("./utils/error");

const express = require("express"),
	app = express(),
	path = require("path"),
	ejsMate = require("ejs-mate"),
	session = require("express-session"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	sanitize = require("express-mongo-sanitize"),
	helmet = require("helmet"),
	index = require("./routes/index"),
	Admin = require("./models/admin");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "somesecret",
		saveUninitialized: true,
		resave: false,
		cookie: {
			expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
	})
);

app.use(flash());
app.use(sanitize());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(
	helmet(
		helmet.contentSecurityPolicy({
			directives: {
				"default-src": ["'self'"],
				"script-src": ["'self'"],
				"object-src": ["'none'"],
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
		await app.listen(4200, () => console.log("Serve on 4200"));
	} catch (e) {
		console.log(e);
	}
};

start();
