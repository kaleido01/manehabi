import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { HashLoader } from "react-spinners";

const Habit = () => {
	return (
		<InfiniteScroll
			loadMore={this.onLoadMore}
			hasMore={pageInfo.hasNextPage}
			loader={<HashLoader />}
		/>
	);
};

export default Habit;
