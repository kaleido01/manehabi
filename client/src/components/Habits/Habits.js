import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid } from "semantic-ui-react";

const Habits = () => {
	const onLoadMore = (habits, fetchMore) => {
		fetchMore({
			variables: {
				offset: habits.length
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
							<HabitList
								allHabits={allHabits}
								onLoadMore={() => onLoadMore(allHabits, fetchMore)}
							/>
						);
					}}
				</Query>
			</Grid.Column>
		</Grid>
	);
};

export default Habits;
