import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
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
				{habits && habits.map(habit => <Habit key={habit._id} habit={habit} />)}
			</InfiniteScroll>
		);
	}
}

export default HabitList;
