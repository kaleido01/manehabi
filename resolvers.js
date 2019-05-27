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
		getCurrentUser: async (root, args, { currentUser }) => {
			if (!currentUser) {
				return null;
			}
			const user = await User.findOne({
				email: currentUser.email
			}).populate({
				path: "habits",
				model: "Habit"
			});
			console.log(user);
			return user;
		},
		getAllHabits: async (root, { offset, limit }, ctx) => {
			const habits = await Habit.find()
				.skip(offset)
				.limit(limit)
				.populate({
					path: "creator",
					model: "User"
				});

			const count = await Habit.countDocuments();
			const pageInfo = {
				startCursor: offset,
				endCursor: limit,
				hasNextPage: offset !== count
			};
			return { habits, pageInfo };
		}
	},
	Mutation: {
		createHabit: async (root, { title, description }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });
			console.log("currentUser", user._id);
			const newHabit = new Habit({
				title,
				description,
				creator: user._id
			});
			await newHabit.save();
			console.log(newHabit._id);
			user.habits.push(newHabit._id);
			console.log(user.habits);
			await user.save();
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
