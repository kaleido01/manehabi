import React, { useEffect, useState } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid, Header, Comment, Segment } from "semantic-ui-react";
import queryString from "query-string";
import SearchHabits from "./SearchHabits";

const Habits = ({ location, refetch }) => {
	const [descending, setDescending] = useState("-1");
	const [option, setOption] = useState("createdAt");
	const [searchTerm, setSearchTerm] = useState("");

	const query = {
		descending,
		option,
		searchTerm
	};
	useEffect(() => {
		const { token } = queryString.parse(location.search);
		if (token) {
			localStorage.setItem("token", token);
			refetch();
		}
	}, []);

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
		<Grid textAlign="center" centered>
			<Grid.Column style={{ minWidth: "350px" }} width={8}>
				<Segment>
					<SearchHabits
						setDescending={setDescending}
						descending={descending}
						option={option}
						setOption={setOption}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<Comment.Group>
						<Header as="h3" dividing textAlign="center">
							新着習慣一覧
						</Header>

						<Query
							query={GET_ALL_HABITS}
							variables={{ offset: 0, limit: 5, ...query }}>
							{({ data, fetchMore, loading }) => {
								if (loading) return <Loader />;
								const { habits, pageInfo } = data.getAllHabits;
								return (
									<HabitList
										habits={habits}
										pageInfo={pageInfo}
										onLoadMore={() => onLoadMore(habits, fetchMore)}
									/>
								);
							}}
						</Query>
					</Comment.Group>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default withRouter(Habits);
