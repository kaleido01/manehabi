import React, { useContext } from "react";
import { Query } from "react-apollo";
import { Grid, Segment, Header, Comment } from "semantic-ui-react";
import { GET_USER_HABITS } from "./../../queries";
import Loader from "./../shered/Loader";
import HabitList from "./HabitList";
import { UserContext } from "./../../index";

const MyHabits = () => {
	const currentUser = useContext(UserContext);
	const onLoadMore = (habits, fetchMore) => {
		fetchMore({
			variables: {
				offset: habits.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				const prevHabits = prev.getUserHabits.habits;
				const currentHabits = fetchMoreResult.getUserHabits.habits;
				return {
					...prev,
					getUserHabits: {
						...prev.getUserHabits,
						habits: [...prevHabits, ...currentHabits],
						pageInfo: fetchMoreResult.getUserHabits.pageInfo
					}
				};
			}
		});
	};

	return (
		<Grid textAlign="center">
			<Grid.Column style={{ minWidth: "350px" }} width={8} textAlign="center">
				<Query query={GET_USER_HABITS} variables={{ offset: 0, limit: 5 }}>
					{({ data, fetchMore, loading }) => {
						if (loading) return <Loader />;
						console.log(data);
						const { habits, pageInfo } = data.getUserHabits;
						return (
							<Segment>
								<Comment.Group>
									<Header as="h3" dividing>
										{currentUser.username}の習慣一覧
									</Header>
									<HabitList
										habits={habits}
										pageInfo={pageInfo}
										onLoadMore={() => onLoadMore(habits, fetchMore)}
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

export default MyHabits;
