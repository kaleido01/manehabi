import React, { useContext } from "react";
import { Comment, Segment } from "semantic-ui-react";
import moment from "moment";
import { UserContext } from "./../../../../index";

const Message = ({ comment }) => {
	const currentUser = useContext(UserContext);
	let color = "purple";
	if (currentUser) {
		color =
			comment && currentUser._id === comment.creator._id ? "black" : "purple";
	}

	return comment ? (
		<Segment raised color={color}>
			<Comment>
				<Comment.Avatar src={comment.creator.imageUrl} />
				<Comment.Content>
					<Comment.Author>{comment.creator.username}</Comment.Author>
					<Comment.Metadata>
						{moment(+comment.createdAt).format("YYYY-MM-DD")}
					</Comment.Metadata>

					<Comment.Text>{comment.body}</Comment.Text>
				</Comment.Content>
			</Comment>
		</Segment>
	) : null;
};

export default Message;
