const validator = require("validator");

const { isEmpty } = validator;

exports.validateTitle = (title, errors) => {
	if (isEmpty(title)) {
		errors.push({
			message: "タイトルは必須です"
		});
	}
};

exports.validateDescription = (description, errors) => {
	if (isEmpty(description)) {
		errors.push({
			message: "説明は必須です"
		});
	}
};

exports.validateUnits = (units, errors) => {
	units.forEach(unit => {
		if (isEmpty(unit)) {
			errors.push({
				message: "単位は全て埋めてください"
			});
		}
	});
};
