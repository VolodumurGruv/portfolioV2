const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});
AdminSchema.plugin(passportLocalMongoose);

module.exports = model("Admin", AdminSchema);
