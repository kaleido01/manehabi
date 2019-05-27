import React from "react";
import { Link } from "react-router-dom";
import { Comment, Segment } from "semantic-ui-react";

const Habit = ({ habit }) => {
	return (
		<Link to={`/habit/${habit._id}`}>
			<Segment style={{ margin: "3px" }}>
				<Comment className="">
					<Comment.Avatar src={habit.creator.imageUrl} />
					<Comment.Content>
						<Comment.Author as="a">{habit.creator.username}</Comment.Author>
						<Comment.Metadata>
							<div>{habit.startDate}</div>
						</Comment.Metadata>
						<Comment.Text>{habit.title}</Comment.Text>
					</Comment.Content>
				</Comment>
			</Segment>
		</Link>
	);
};

export default Habit;
