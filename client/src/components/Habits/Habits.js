import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid, Segment, Header, Comment } from "semantic-ui-react";

const Habits = () => {
	const onLoadMore = (allHabits, fetchMore) => {
		fetchMore({
			variables: {
				offset: allHabits.habits.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				const prevHabits = prev.getAllHabits.habits;
				const currentHabits = fetchMoreResult.getAllHabits.habits;
				return {
					...prev,
					getAllHabits: {
						...prev.getAllHabits,
						habits: [...prevHabits, ...currentHabits],
						pageInfo: fetchMoreResult.getAllHabits.pageInfo
					}
				};
			}
		});
	};
	return (
		<Grid textAlign="center">
			<Grid.Column style={{ minWidth: "350px" }} width={8} textAlign="center">
				<Query query={GET_ALL_HABITS} variables={{ offset: 0, limit: 5 }}>
					{({ data, fetchMore, loading }) => {
						if (loading) return <Loader />;
						const allHabits = data && data.getAllHabits;
						return (
							<Segment>
								<Comment.Group>
									<Header as="h3" dividing>
										新着習慣一覧
									</Header>
									<HabitList
										allHabits={allHabits}
										onLoadMore={() => onLoadMore(allHabits, fetchMore)}
									/>
								</Comment.Group>
							</Segment>
						);
					}}
				</Query>
			</Grid.Column>
		</Grid>
	);
};

export default Habits;
