import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Comment, Header, Segment } from "semantic-ui-react";
import Loader from "./../shered/Loader";
import Habit from "./Habit";

class HabitList extends Component {
	onLoadMore = () => {
		const {
			allHabits: { habits },
			fetchMore
		} = this.props;

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

	render() {
		const {
			allHabits: { habits, pageInfo }
		} = this.props;
		return (
			<InfiniteScroll
				loadMore={this.onLoadMore}
				hasMore={pageInfo.hasNextPage}
				loader={<Loader key={pageInfo} />}>
				{/* <Grid textAlign="center">
          <Grid.Column> */}
				<Segment>
					<Comment.Group>
						<Header as="h3" dividing>
							新着習慣一覧
						</Header>
						{habits &&
							habits.map(habit => <Habit key={habit._id} habit={habit} />)}
					</Comment.Group>
				</Segment>
				{/* </Grid.Column>
				</Grid> */}
			</InfiniteScroll>
		);
	}
}

export default HabitList;
