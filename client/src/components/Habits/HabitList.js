import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Comment } from "semantic-ui-react";
import Loader from "./../shered/Loader";

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
				console.log(prev);
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
		console.log(habits);
		return (
			<InfiniteScroll
				loadMore={this.onLoadMore}
				hasMore={pageInfo.hasNextPage}
				loader={<Loader />}>
				{habits &&
					habits.map(habit => (
						<Comment key={habit._id}>
							<Comment.Avatar src="/images/avatar/small/matt.jpg" />
							<Comment.Content>
								<Comment.Author as="a">{habit.creator.username}</Comment.Author>
								<Comment.Metadata>
									<div>{habit.startDate}</div>
								</Comment.Metadata>
								<Comment.Text>{habit.title}</Comment.Text>
							</Comment.Content>
						</Comment>
					))}
			</InfiniteScroll>
		);
	}
}

export default HabitList;
