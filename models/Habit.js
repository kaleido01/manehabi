const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
	name: {
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
				.add("days", 1)
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
	star: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Habit", HabitSchema);