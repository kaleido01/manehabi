import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid, GridColumn } from "semantic-ui-react";

const Habits = () => {
	return (
		<Grid textAlign="center">
			<GridColumn width={8}>
				<Query query={GET_ALL_HABITS} variables={{ offSet: 0, limit: 5 }}>
					{({ data, fetchMore, loading }) => {
						if (loading) return <Loader />;
						const { getAllHabits } = data;
						return <HabitList allHabits={getAllHabits} fetchMore={fetchMore} />;
					}}
				</Query>
			</GridColumn>
		</Grid>
	);
};

export default Habits;
