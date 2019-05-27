import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_HABIT } from "../../queries";
import { Segment, Comment } from "semantic-ui-react";
import Loader from "./../shered/Loader";

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
	return (
		<Query query={GET_HABIT} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Loader />;
				const { getHabit } = data;
				return (
					<Segment>
						<Comment className="">
							<Comment.Avatar src={getHabit.creator.imageUrl} />
							<Comment.Content>
								<Comment.Author as="a">
									{getHabit.creator.username}
								</Comment.Author>
								<Comment.Metadata>
									<div>{getHabit.startDate}</div>
								</Comment.Metadata>
								<Comment.Text>{getHabit.title}</Comment.Text>
							</Comment.Content>
						</Comment>
					</Segment>
				);
			}}
		</Query>
	);
};

export default withRouter(HabitDescription);
