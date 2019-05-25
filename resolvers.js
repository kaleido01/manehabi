const Habit = require("./models/Habit");
const User = require("./models/User");

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
			const newUser = new User({
				username,
				email,
				password
			});
			await newUser.save();
			return newUser;
		}
	}
};
