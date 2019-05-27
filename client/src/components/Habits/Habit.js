import React from "react";
import { Comment } from "semantic-ui-react";

const Habit = ({ habit }) => {
	return (
		<Comment>
			<Comment.Avatar src={habit.creator.imageUrl} />
			<Comment.Content>
				<Comment.Author as="a">{habit.creator.username}</Comment.Author>
				<Comment.Metadata>
					<div>{habit.startDate}</div>
				</Comment.Metadata>
				<Comment.Text>{habit.title}</Comment.Text>
			</Comment.Content>
		</Comment>
	);
};

export default Habit;
