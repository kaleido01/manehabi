const Habit = require("./models/Habit");
const User = require("./models/User");
const HabitRecord = require("./models/HabitRecord");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./config/keys").secret;
const md5 = require("md5");

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
			})
				.populate({ path: "habits", model: "Habit" })
				.populate({ path: "favorites", model: "Habit" })
				.exec();
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
		},
		getUserHabits: async (root, { offset, limit }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });

			const habits = await Habit.find({ creator: user._id })
				.skip(offset)
				.limit(limit)
				.populate({
					path: "creator",
					model: "User"
				});

			const count = await Habit.countDocuments({ creator: user._id });
			console.log(count);
			const pageInfo = {
				startCursor: offset,
				endCursor: limit,
				hasNextPage: offset !== count
			};
			return { habits, pageInfo };
		},
		getHabit: async (root, { _id }, ctx) => {
			const habit = await Habit.findById(_id).populate({
				path: "creator",
				model: "User"
			});
			return habit;
		},
		getHabitRecord: async (root, { _id, type }, ctx) => {
			const habit = await Habit.findById();
		}
	},

	Mutation: {
		createHabit: async (root, { title, description }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });
			const newHabit = new Habit({
				title,
				description,
				creator: user._id
			});
			await newHabit.save();
			user.habits.push(newHabit._id);
			await user.save();
			return newHabit;
		},
		deleteHabit: async (root, { _id }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });

			const habit = await Habit.findById(_id);

			habit.starUser.forEach(async userId => {
				console.log(userId);
				await User.findOneAndUpdate(
					{ _id: userId },
					{
						$pull: {
							favorites: _id
						}
					}
				);
			});
			const deleteHabit = await Habit.findByIdAndDelete(_id);
			console.log(deleteHabit);
			return deleteHabit;
		},
		updateHabit: async (root, { _id, today }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });
			const habit = await Habit.findById(_id)
				.populate({
					path: "record",
					model: "HabitRecord",
					options: { sort: { date: -1 } }
				})
				.populate({
					path: "creator",
					model: "User"
				})

				.exec();

			if (String(user._id) !== String(habit.creator._id)) {
				return new Error("作成者が異なるので更新できません");
			}
			let beforeTotal = 0;

			let beforeId = null;

			if (habit.record.length !== 0) {
				let { _id, total } = habit.record[0];
				beforeId = _id;
				beforeTotal = total;
			}

			const record = new HabitRecord({
				date: Date.now(),
				total: beforeTotal + today,
				today,
				before: beforeId,
				habitId: _id
			});

			await record.save();

			if (!habit.record) {
				habit.record = [record._id];
			} else {
				habit.record.push(record._id);
			}
			await habit.save();

			return record;
		},
		starHabit: async (root, { _id }, { currentUser }) => {
			if (!currentUser) {
				return new Error("Not Authenticated");
			}
			const user = await User.findOne({ email: currentUser.email });
			await Habit.findByIdAndUpdate(_id, {
				$addToSet: {
					starUser: user._id
				}
			});
			await User.findByIdAndUpdate(user._id, {
				$addToSet: {
					favorites: _id
				}
			});
			return await Habit.findById(_id);
		},
		unStarHabit: async (root, { _id }, { currentUser }) => {
			if (!currentUser) {
				return new Error("Not Authenticated");
			}
			const user = await User.findOne({ email: currentUser.email });
			await Habit.findByIdAndUpdate(_id, {
				$pull: {
					starUser: user._id
				}
			});
			await User.findByIdAndUpdate(user._id, {
				$pull: {
					favorites: _id
				}
			});
			return await Habit.findById(_id);
		},
		createUser: async (root, { username, email, password }, ctx) => {
			const hashedPw = await bcrypt.hash(password, 12);
			const newUser = new User({
				username,
				email,
				password: hashedPw,
				imageUrl: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
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
