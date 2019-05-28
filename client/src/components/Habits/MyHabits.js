import React, { useContext } from "react";
import { Query } from "react-apollo";
import { Grid, Segment, Header, Comment } from "semantic-ui-react";
import { GET_USER_HABITS } from "./../../queries";
import Loader from "./../shered/Loader";
import HabitList from "./HabitList";
import { UserContext } from "./../../index";

const MyHabits = () => {
	const currentUser = useContext(UserContext);
	const onLoadMore = (allHabits, fetchMore) => {
		fetchMore({
			variables: {
				offset: allHabits.habits.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				const prevHabits = prev.getUserHabits.habits;
				const currentHabits = fetchMoreResult.getUserHabits.habits;
				return {
					...prev,
					getAllHabits: {
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
						const allHabits = data && data.getUserHabits;
						return (
							<Segment>
								<Comment.Group>
									<Header as="h3" dividing>
										{currentUser.username}の習慣一覧
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

export default MyHabits;
