import React from "react";
import { Label, Icon } from "semantic-ui-react";
import "./Habits.css";

const StarLabel = () => {
	const handleClick = () => {};

	return (
		<Label as="a" onClick={handleClick} color="purple" ribbon="right">
			<Icon name="star outline" /> お気に入りに追加
		</Label>
	);
};

export default StarLabel;
