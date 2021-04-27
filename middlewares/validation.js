function validate(req, res, next) {
  const { userName } = req.body;

  if (userName && userName.length >= 3) {
    return next();
  } else {
    req.flash(
      "error",
      "Username have to be more than 2 letters and doesn't have symbols"
    );
    return res.redirect("/contact");
  }
}

module.exports = validate;
