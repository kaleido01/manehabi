exports.isCurrentUser = (currentUser, errors) => {};

exports.isFindUser = (user, errors) => {
	if (!user) {
		errors.push({
			message: "ユーザーが見つかりません"
		});
	}
};
