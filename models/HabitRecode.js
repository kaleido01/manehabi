const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HabitRecodeSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	total: {
		type: Number,
		default: 0
	},
	today: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("HabitRecode", HabitRecodeSchema);
