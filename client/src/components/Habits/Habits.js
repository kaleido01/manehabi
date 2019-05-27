import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import {
	Sidebar,
	Menu,
	Icon,
	Segment,
	Button,
	Comment
} from "semantic-ui-react";

const Habits = () => {
	const renderHabits = habits => {
		return habits.map(habit => (
			<Comment>
				<Comment.Avatar src="/images/avatar/small/matt.jpg" />
				<Comment.Content>
					<Comment.Author as="a">{habit.creator.username}</Comment.Author>
					<Comment.Metadata>
						<div>{habit.startDate}</div>
					</Comment.Metadata>
					<Comment.Text>{habit.title}</Comment.Text>
				</Comment.Content>
			</Comment>
		));
	};
	return (
		<Query query={GET_ALL_HABITS}>
			{({ data, loading, error }) => {
				if (loading) return <div>loading...</div>;
				console.log(data);
				return <Comment.Group>{renderHabits(data.getAllHabits)}</Comment.Group>;
			}}
		</Query>
	);
};

export default Habits;
