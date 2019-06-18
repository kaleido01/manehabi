exports.isCurrentUser = (currentUser, errors) => {
	if (!currentUser) {
		errors.push({
			message: "セッションが切れていますログインし直してください"
		});
	}
};

exports.isFindUser = (user, errors) => {
	if (!user) {
		errors.push({
			message: "ユーザーが見つかりません"
		});
	}
};
