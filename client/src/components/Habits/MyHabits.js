import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { Grid, Segment, Header, Comment, Message } from "semantic-ui-react";
import { GET_USER_HABITS } from "./../../queries";
import Loader from "./../shered/Loader";
import HabitList from "./HabitList";
import { UserContext } from "./../../index";

const MyHabits = ({ history }) => {
	const currentUser = useContext(UserContext);

	useEffect(() => {
		if (!currentUser) {
			history.push("login");
		}
	}, [currentUser, history]);
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
		<Grid textAlign="center" centered>
			<Grid.Column style={{ minWidth: "350px" }} width={8}>
				<Segment>
					<Comment.Group>
						<Header as="h3" dividing>
							{currentUser.username}さんの習慣一覧
						</Header>
						<Query query={GET_USER_HABITS} variables={{ offset: 0, limit: 5 }}>
							{({ data, fetchMore, loading, error }) => {
								if (loading) return <Loader />;
								if (error) return <div>{error}</div>;

								const { habits, pageInfo } = data.getUserHabits;
								return habits.length !== 0 ? (
									<HabitList
										habits={habits}
										pageInfo={pageInfo}
										onLoadMore={() => onLoadMore(habits, fetchMore)}
									/>
								) : (
									<Message info floating>
										まだ習慣がありません。最初の習慣を作りましょう
									</Message>
								);
							}}
						</Query>
					</Comment.Group>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default withRouter(MyHabits);
