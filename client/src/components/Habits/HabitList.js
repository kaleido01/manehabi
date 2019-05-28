import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Comment, Header, Segment } from "semantic-ui-react";
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
			<Segment>
				<Comment.Group>
					<Header as="h3" dividing>
						新着習慣一覧
					</Header>
					{habits &&
						habits.map((habit, index) => <Habit key={index} habit={habit} />)}
				</Comment.Group>
			</Segment>
		</InfiniteScroll>
	);
};

export default HabitList;
