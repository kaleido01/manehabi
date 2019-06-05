import React, { useContext, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Segment, Header, Comment, Button } from "semantic-ui-react";
import { UserContext } from "../../index";
import moment from "moment";

const FavoriteHabits = ({ history }) => {
	const currentUser = useContext(UserContext);

	useEffect(() => {
		if (!currentUser) {
			history.push("login");
		}
	}, [currentUser, history]);

	const favoriteList =
		currentUser &&
		currentUser.favorites.map(favorite => {
			console.log(favorite);
			return (
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
			);
		});

	return (
		<Grid textAlign="center" centered>
			<Grid.Column style={{ minWidth: "350px" }} width={8}>
				<Segment>
					<Comment.Group>
						<Header as="h3" dividing>
							{/* {currentUser.username}の習慣一覧 */}
						</Header>
						{console.log(currentUser)}
						{favoriteList}
					</Comment.Group>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default withRouter(FavoriteHabits);
