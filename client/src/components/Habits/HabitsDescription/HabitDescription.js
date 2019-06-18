import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_HABIT, GET_HABIT_RECORDS } from "../../../queries";
import { Grid } from "semantic-ui-react";
import Loader from "../../shered/Loader";
import HabitCreator from "./HabitCreator";
import Description from "./Description";
import HabitGraph from "./HabitGraph";
import CommentContainer from "./Comment/CommentContainer";
import MessageList from "./Comment/MessageList";
import SearchComment from "./Comment/SearchComment";

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
	const [days, setDays] = useState(7);
	const [descending, setDescending] = useState("-1");
	const [user, setUser] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	const commentOptions = {
		descending,
		user,
		searchTerm
	};

	const renderGraph = habit => {
		return habit.habitRecords.map(habitRecord => {
			return (
				<Query
					query={GET_HABIT_RECORDS}
					variables={{
						habitId: habit._id,
						habitRecordNumber: habitRecord._id,
						limit: days
					}}>
					{({ data, loading }) => {
						if (loading) return <div>loading</div>;
						const { getHabitRecords } = data;

						return (
							<HabitGraph
								days={days}
								setDays={setDays}
								records={getHabitRecords}
								habit={habit}
								unit={habitRecord.unit}
							/>
						);
					}}
				</Query>
			);
		});
	};

	return (
		<Query query={GET_HABIT} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Loader />;
				if (error) {
					console.log(error);
				}
				const { getHabit } = data;
				return (
					<Grid textAlign="center" centered stackable container>
						<Grid.Row>
							<Grid.Column computer={6} mobile={8} tablet={6}>
								<HabitCreator habit={getHabit} />
							</Grid.Column>
							<Grid.Column computer={10} tablet={10} mobile={8}>
								<Description habit={getHabit} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column computer={8} mobile={16}>
								{renderGraph(getHabit)}
							</Grid.Column>
						</Grid.Row>
						<Grid.Column width={8}>
							<CommentContainer
								habit={getHabit}
								creatorId={getHabit.creator._id}
								commentOptions={commentOptions}
							/>
							<SearchComment
								setDescending={setDescending}
								descending={descending}
								user={user}
								setUser={setUser}
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
							<MessageList habit={getHabit} commentOptions={commentOptions} />
						</Grid.Column>
					</Grid>
				);
			}}
		</Query>
	);
};

export default withRouter(HabitDescription);
