import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import { Grid } from "semantic-ui-react";
import Loader from "../shered/Loader";

const Habits = () => {
	return (
		<Grid textAlign="center">
			<Grid.Column>
				<Query query={GET_ALL_HABITS} variables={{ offSet: 0, limit: 5 }}>
					{({ data, fetchMore, loading }) => {
						const { getAllHabits } = data;
						if (loading || !getAllHabits) return <Loader />;
						console.log(getAllHabits);
						return <HabitList allHabits={getAllHabits} fetchMore={fetchMore} />;
					}}
				</Query>
			</Grid.Column>
		</Grid>
	);
};

export default Habits;
