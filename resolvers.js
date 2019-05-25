const Habit = require("./models/Habit");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./config/keys").secret;

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	const token = jwt.sign({ username, email }, secret, { expiresIn });
	return token;
};

module.exports = {
	Query: {
		getCurrentUser: () => {
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

			const token = createToken(newUser, secret, "1hr");

			return { token };
		},
		login: async (root, { email, password }, ctx) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error("user not found");
			}
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				throw new Error("Invalid password");
			}
			const token = createToken(user, secret, "1hr");
			return { token };
		}
	}
};
