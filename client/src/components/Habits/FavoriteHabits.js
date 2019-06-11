import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
	Grid,
	Segment,
	Header,
	Comment,
	Button,
	Message
} from "semantic-ui-react";
import { UserContext } from "../../index";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./../shered/Loader";

const FavoriteHabits = () => {
	const currentUser = useContext(UserContext);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [count, setCount] = useState(0);

	const onLoadMore = () => {
		if (count <= currentUser.favorites.length) {
			setCount(count + 5);
		} else {
			setCount(currentUser.favorites.length);
			setHasNextPage(false);
		}
	};

	const favoriteList = [...currentUser.favorites]
		.slice(0, count)
		.map(favorite => {
			return (
				<Segment key={favorite._id} raised>
					<Comment>
						<Comment.Avatar src={favorite.creator.imageUrl} />
						<Comment.Content>
							<Comment.Author>{favorite.creator.username}</Comment.Author>
							<Comment.Metadata>
								<div>
									作成日時: {moment(+favorite.createdAt).format("YYYY-MM-DD")}
								</div>
							</Comment.Metadata>
							<Comment.Text>タイトル: {favorite.title}</Comment.Text>
						</Comment.Content>
						<Button
							style={{ margin: "0.5em" }}
							as={Link}
							color="green"
							to={`/habit/${favorite._id}`}>
							詳細
						</Button>
					</Comment>
				</Segment>
			);
		});

	return (
		<Grid textAlign="center" centered>
			<Grid.Column style={{ minWidth: "350px" }} width={8}>
				<Segment textAlign="center">
					<Comment.Group>
						<Header as="h3" dividing>
							{currentUser.username}さんのお気に入り習慣一覧
						</Header>

						<InfiniteScroll
							loadMore={onLoadMore}
							hasMore={hasNextPage}
							loader={<Loader key={favoriteList.length} />}>
							{favoriteList}
						</InfiniteScroll>
						{!favoriteList && (
							<Message info floating>
								まだお気に入りの習慣がありません。お気に入りの習慣を登録してみましょう。
							</Message>
						)}
					</Comment.Group>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default FavoriteHabits;
