const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	joinDate: {
		type: String,
		default: () => moment().format("YYYY-MM-DD")
	},
	favorites: {
		type: [Schema.Types.ObjectId],
		ref: "Habit"
	},
	Habits: {
		type: [Schema.Types.ObjectId],
		ref: "Habit"
	}
});

module.exports = mongoose.model("User", UserSchema);
