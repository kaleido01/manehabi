const mongoose = require("mongoose");
const moment = require("momnent");

const Schema = mongoose.Schema;

const HabitSchema = new Schema({
	habitName: {
		type: String,
		required: true
	},
	createdAt: {
		type: String,
		default: () => moment().format("YYYY-MM-DD")
	},
	startDate: {
		type: Date,
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
	NumberOfFailure: {
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
