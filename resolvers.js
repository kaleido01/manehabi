const Habit = require("./models/Habit");
const User = require("./models/User");
const HabitRecord = require("./models/HabitRecord");
const Comment = require("./models/Comment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./config/keys").secret;
const md5 = require("md5");
const moment = require("moment");
const { checkErrors, createToken } = require("./validation/utils");
const { validateEmail } = require("./validation/emailValidation");
const {
	validatePasswordLength,
	validateIsWrongPassword
} = require("./validation/passwordValidation");
const { isFindUser, isCurrentUser } = require("./validation/userValidation");

exports.resolvers = {
	Query: {
		getCurrentUser: async (root, args, { currentUser }) => {
			if (!currentUser) {
				return null;
			}
			const user = await User.findOne({
				email: currentUser.email
			})
				.populate({ path: "habits", model: "Habit" })
				.populate({
					path: "favorites",
					populate: {
						path: "creator",
						model: "User"
					},
					model: "Habit"
				})
				.exec();
			return user;
		},
		getAllHabits: async (
			root,
			{ offset, limit, searchTerm, option, descending },
			ctx
		) => {
			let sort = {};
			sort[option] = descending;

			let habits;
			let count;

			if (searchTerm) {
				habits = await Habit.find({
					$text: { $search: searchTerm }
				})
					.skip(offset)
					.limit(limit)
					.populate({
						path: "creator",
						model: "User"
					})
					.sort(sort);
				count = await Habit.countDocuments({
					$text: { $search: searchTerm }
				});
			} else {
				habits = await Habit.find()
					.skip(offset)
					.limit(limit)
					.populate({
						path: "creator",
						model: "User"
					})
					.sort(sort);
				count = await Habit.countDocuments();
			}
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
		getHabitRecords: async (
			root,
			{ habitId, habitRecordNumber, limit },
			ctx
		) => {
			console.log(habitId, habitRecordNumber);
			const startDate = moment()
				.add(-limit + 1, "days")
				.startOf("days")
				.toDate();
			// const habitRecords = await HabitRecord.find({
			// 	habitId: _id,
			// 	date: { $gte: startDate }
			// 	// options: { sort: { date: -1 } }
			// })
			// 	.limit(limit)
			// 	.sort({ date: 1 });

			const habitRecords = await HabitRecord.find({
				habitId,
				habitRecordNumber,
				date: { $gte: startDate }
			}).sort({ date: 1 });

			console.log(habitRecords);

			// .populate({
			// 	path: "record",
			// 	model: "HabitRecord",
			// 	match: { date: { $gte: startDate } },
			// 	options: { sort: { date: -1 }, limit }
			// })
			// .sort({ date: 1 });
			// .sort({ record: { date: 1 } });

			return habitRecords ? habitRecords : [];
		},
		getHabitTimeRecords: async (root, { _id, limit }, ctx) => {
			const startDate = moment()
				.add(-limit + 1, "days")
				.startOf("days")
				.toDate();
			// const habitRecords = await HabitRecord.find({
			// 	habitId: _id,
			// 	date: { $gte: startDate }
			// 	// options: { sort: { date: -1 } }
			// })
			// 	.limit(limit)
			// 	.sort({ date: 1 });

			const habitRecords = await Habit.findById({ _id })
				.populate({
					path: "timeRecord",
					model: "HabitRecord",
					match: { date: { $gte: startDate } },
					options: { sort: { date: -1 }, limit }
				})
				.sort({ date: 1 });
			// .sort({ record: { date: 1 } });
			console.log(habitRecords);
			return habitRecords.timeRecord.reverse();
		},
		getMessages: async (
			root,
			{ _id, offset, limit, descending, user, searchTerm },
			{ currentUser }
		) => {
			let _currentUser;
			if (currentUser) {
				_currentUser = await User.findOne({ email: currentUser.email });
			}

			let condition;

			if (user === "all") {
				condition = {
					habitId: _id
				};
			} else if (user === "user") {
				condition = {
					habitId: _id,
					creator: { _id: _currentUser._id }
				};
			} else if (user === "other") {
				condition = {
					habitId: _id,
					creator: { $ne: { _id: _currentUser._id } }
				};
			}

			if (searchTerm) {
				condition = {
					...condition,
					$text: { $search: searchTerm }
				};
			}

			console.log("searchTerm", searchTerm);

			const messages = await Comment.find(condition)
				.skip(offset)
				.limit(limit)
				.populate({ path: "creator", model: "User" })
				.sort({ createdAt: +descending });

			// console.log("messages", messages);

			const count = await Comment.countDocuments(condition);

			const pageInfo = {
				startCursor: offset,
				endCursor: limit,
				hasNextPage: offset !== count
			};
			return { messages, pageInfo };
		}
	},

	Mutation: {
		createHabit: async (
			root,
			{ title, description, units },
			{ currentUser }
		) => {
			let errors = [];
			if (!currentUser) {
				errors.push({
					message: "セッションが切れていますログインし直してください"
				});
			}

			const { isEmpty } = validator;

			if (isEmpty(title)) {
				errors.push({
					message: "タイトルは必須です"
				});
			}
			if (isEmpty(description)) {
				errors.push({
					message: "説明は必須です"
				});
			}
			units.forEach(unit => {
				if (isEmpty(unit)) {
					errors.push({
						message: "単位は全て埋めてください"
					});
				}
			});
			if (errors.length > 0) {
				const error = new Error(errors);
				error.data = errors;
				error.code = 422;
				throw error;
			}

			const user = await User.findOne({ email: currentUser.email });

			const habitRecords = units.map(unit => {
				return {
					unit
				};
			});

			const newHabit = new Habit({
				title,
				description,
				creator: user._id,
				habitRecords
			});
			await newHabit.save();
			user.habits.push(newHabit._id);
			await user.save();
			return newHabit;
		},
		deleteHabit: async (root, { _id }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });

			const habit = await Habit.findById(_id).populate({
				path: "creator",
				model: "User"
			});

			if (String(user._id) !== String(habit.creator._id)) {
				return new Error("作成者が異なるので更新できません");
			}

			await habit.remove();

			return habit;
		},
		updateHabit: async (root, { _id, todayRecords }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });
			const habit = await Habit.findById(_id)
				.populate({
					path: "habitRecords.records",
					model: "HabitRecord"
					// options: { sort: { date: -1 } }
				})
				.populate({
					path: "creator",
					model: "User"
				})
				.exec();

			if (String(user._id) !== String(habit.creator._id)) {
				return new Error("作成者が異なるので更新できません");
			}

			//ここからrecordsの更新
			await habit.habitRecords.forEach(async habitRecord => {
				let beforeTotal = 0;
				let beforeId = null;

				const updateIndex = todayRecords.findIndex(todayRecord => {
					return String(todayRecord.recordNumber) === String(habitRecord._id);
				});
				console.log(todayRecords[updateIndex]);
				const { today, recordNumber } = todayRecords[updateIndex];
				if (habitRecord.records.length !== 0) {
					let { _id, total } = habitRecord.records[
						habitRecord.records.length - 1
					];
					beforeId = _id;
					beforeTotal = total;
				}
				const record = new HabitRecord({
					date: Date.now(),
					total: beforeTotal + today,
					today,
					before: beforeId,
					habitId: _id,
					habitRecordNumber: recordNumber
				});

				habit.habitRecords[updateIndex].records.push(record._id);
				await record.save();
			});

			habit.updateDate = Date.now();
			habit.countDate += 1;

			await habit.save();

			// for (let index = 0; index < 100; index++) {
			// 	const record = new HabitRecord({
			// 		date: moment()
			// 			.add(-index, "days")
			// 			.toDate(),
			// 		total: beforeTotal + today + index,
			// 		today: today + index,
			// 		before: beforeId,
			// 		habitId: _id
			// 	});

			// 	await record.save();

			// 	if (!habit.record) {
			// 		habit.record = [record._id];
			// 	} else {
			// 		habit.record.push(record._id);
			// 	}
			// 	await habit.save();
			// }

			return true;
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
		resetCount: async (root, { _id }, { currentUser }) => {
			if (!currentUser) {
				return new Error("Not Authenticated");
			}
			const user = await User.findOne({ email: currentUser.email });

			const habit = await Habit.findById(_id).populate({
				path: "creator",
				model: "User"
			});

			if (String(user._id) !== String(habit.creator._id)) {
				return new Error("作成者が異なるのでリセットできません");
			}

			habit.countDate = 0;
			habit.startDate = Date.now();
			habit.numberOfFailure += 1;

			await habit.save();

			return habit;
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
		updateProfile: async (
			root,
			{ username, email, oneWord, description },
			{ currentUser }
		) => {
			const user = await User.findOne({ email: currentUser.email });

			user.username = username;
			user.email = email;
			user.oneWord = oneWord;
			user.desription = description;

			user.save();

			return user;
		},
		createComment: async (root, { body, habitId }, { currentUser }) => {
			const user = await User.findOne({ email: currentUser.email });
			const comment = new Comment({
				body,
				creator: user._id,
				habitId
			});
			const habit = await Habit.findById(habitId);
			await comment.save();

			habit.comments.push(comment._id);
			await habit.save();

			return comment;
		},
		login: async (root, { email, password }, ctx) => {
			let errors = [];

			validateEmail(email, errors);
			validatePasswordLength(password, errors);
			checkErrors(errors);

			const user = await User.findOne({ email });
			isFindUser(user, errors);
			checkErrors(errors);

			const isValidPassword = await bcrypt.compare(password, user.password);
			validateIsWrongPassword(isValidPassword, errors);
			checkErrors(errors);

			const token = createToken(user, secret, "1hr");
			return { token };
		}
	}
};
