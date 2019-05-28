const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	createdAt: {
		type: String,
		default: () => moment().format("YYYY-MM-DD")
	},
	startDate: {
		type: String,
		default: () => moment().format("YYYY-MM-DD")
	},
	limitDate: {
		type: String,
		default: () =>
			moment()
				.add(1, "days")
				.endOf("day")
				.format()
	},
	countDate: {
		type: Number,
		default: 0
	},
	numberOfFailure: {
		type: Number,
		default: 0
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	starUser: {
		type: [Schema.Types.ObjectId],
		default: [],
		ref: "User"
	}
});

module.exports = mongoose.model("Habit", HabitSchema);
