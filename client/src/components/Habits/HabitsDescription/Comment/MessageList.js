import React from "react";
import { Query } from "react-apollo";
import { GET_MESSAGES } from "../../../../queries";
import Message from "./Message";
import { Segment } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../shered/Loader";

const MessageList = ({ habit, commentOptions }) => {
	const onLoadMore = (messages, fetchMore) => {
		console.log(messages);
		fetchMore({
			variables: {
				offset: messages.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				const prevMessages = prev.getMessages.messages;
				const currentMessages = fetchMoreResult.getMessages.messages;
				return {
					...prev,
					getMessages: {
						...prev.getMessages,
						messages: [...prevMessages, ...currentMessages],
						pageInfo: fetchMoreResult.getMessages.pageInfo
					}
				};
			}
		});
	};

	const displayMessages = messages => {
		return (
			messages.length > 0 &&
			messages.map(message => <Message key={message._id} comment={message} />)
		);
	};

	const variables = {
		_id: habit._id,
		offset: 0,
		limit: 5,
		...commentOptions
	};

	console.log(variables);

	return (
		<Query
			query={GET_MESSAGES}
			variables={{
				_id: habit._id,
				offset: 0,
				limit: 5,
				...commentOptions
			}}>
			{({ data, loading, fetchMore }) => {
				if (loading) return <div>loading</div>;
				const { messages, pageInfo } = data.getMessages;
				return (
					<Segment>
						<InfiniteScroll
							loadMore={() => onLoadMore(messages, fetchMore)}
							hasMore={pageInfo.hasNextPage}
							loader={<Loader />}>
							{displayMessages(messages)}
						</InfiniteScroll>
					</Segment>
				);
			}}
		</Query>
	);
};

export default MessageList;
