import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid, GridColumn } from "semantic-ui-react";

const Habits = () => {
	return (
		<Grid textAlign="center">
			<GridColumn style={{ minWidth: "350px" }} width={8} textAlign="center">
				<Query query={GET_ALL_HABITS} variables={{ offSet: 0, limit: 5 }}>
					{({ data, fetchMore, loading }) => {
						if (loading) return <Loader />;
						const allHabits = data && data.getAllHabits;
						return <HabitList allHabits={allHabits} fetchMore={fetchMore} />;
					}}
				</Query>
			</GridColumn>
		</Grid>
	);
};

export default Habits;
