import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Comment, Segment } from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";

const Habit = ({ habit }) => {
	const currentUser = useContext(UserContext);
	const myHabit = currentUser && currentUser._id === habit.creator._id;
	return (
		<Link to={`/habit/${habit._id}`}>
			<Segment
				padded
				className="Habit"
				raised
				color={myHabit ? "orange" : "teal"}
				style={{ margin: "1em" }}>
				<Comment>
					<Comment.Avatar src={habit.creator.imageUrl} />
					<Comment.Content>
						<Comment.Author>{habit.creator.username}</Comment.Author>
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
