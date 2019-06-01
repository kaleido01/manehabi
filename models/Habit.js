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
		type: Date,
		default: Date.now
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	limitDate: {
		type: Date,
		default: () =>
			moment()
				.add(1, "days")
				.endOf("day")
				.toDate()
	},
	countDate: {
		type: Number,
		default: 0
	},
	numberOfFailure: {
		type: Number,
		default: 0
	},
	recode: {
		type: [Schema.Types.ObjectId],
		ref: "HabitRecode"
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
