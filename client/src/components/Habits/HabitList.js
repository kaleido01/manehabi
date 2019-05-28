import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./../shered/Loader";
import Habit from "./Habit";

const HabitList = props => {
	const {
		allHabits: { habits, pageInfo }
	} = props;

	return (
		<InfiniteScroll
			loadMore={props.onLoadMore}
			hasMore={pageInfo.hasNextPage}
			loader={<Loader key={pageInfo} />}>
			{habits &&
				habits.map((habit, index) => <Habit key={index} habit={habit} />)}
		</InfiniteScroll>
	);
};

export default HabitList;
