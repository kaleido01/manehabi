import React, { useEffect, useState, Fragment } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import Loader from "../shered/Loader";
import { Grid, Header, Comment, Segment } from "semantic-ui-react";
import queryString from "query-string";
import SearchHabits from "./SearchHabits";
import { WelcomeLoader } from "./../shered/Loader";

const Habits = ({ location, refetch }) => {
	const [descending, setDescending] = useState("-1");
	const [option, setOption] = useState("createdAt");
	const [searchTerm, setSearchTerm] = useState("");
	const [authLoading, setAuthLoading] = useState(false);

	const query = {
		descending,
		option,
		searchTerm
	};
	useEffect(() => {
		const { token } = queryString.parse(location.search);
		if (token) {
			localStorage.setItem("token", token);
			setAuthLoading(true);
			refetch().then(res => {
				setAuthLoading(false);
				console.log(res);
			});
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
		<Fragment>
			{authLoading ? (
				<WelcomeLoader />
			) : (
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
										if (loading || authLoading) return <Loader />;
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
			)}
		</Fragment>
	);
};

export default withRouter(Habits);
