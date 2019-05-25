const Habit = require("./models/Habit");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

module.exports = {
	Query: {
		getAllHabits: () => {
			return;
		}
	},
	Mutation: {
		createHabit: async (root, { name }, ctx) => {
			const newHabit = new Habit({
				name
			});
			await newHabit.save();
			return newHabit;
		},
		createUser: async (root, { username, email, password }, ctx) => {
			const hashedPw = await bcrypt.hash(password, 12);
			const newUser = new User({
				username,
				email,
				password: hashedPw
			});
			await newUser.save();
			return newUser;
		}
	}
};
