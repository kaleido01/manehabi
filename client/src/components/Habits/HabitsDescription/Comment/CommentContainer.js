import React, { useState } from "react";
import { CREATE_COMMENT } from "./../../../../queries/index";
import { Form, Segment, Button, TextArea } from "semantic-ui-react";
import { Mutation } from "react-apollo";

const CommentContainer = ({ creatorId, habit }) => {
	const [body, setBody] = useState(`${habit.countDate}日目 :`);

	const handleSubmit = (event, createComment) => {
		event.preventDefault();
		createComment().then(res => {
			console.log(res);
		});
	};
	return (
		<div>
			<Mutation
				mutation={CREATE_COMMENT}
				variables={{ body, creatorId, habitId: habit._id }}>
				{(createComment, { data, loading }) => {
					return (
						<Form
							onSubmit={event => handleSubmit(event, createComment)}
							size="large">
							<Segment>
								<TextArea
									name="body"
									placeholder=""
									onChange={event => setBody(event.target.value)}
									value={body}
									// className={this.handleInputError(errors, "Eメール")}
									type="textInput"
								/>
								<Button color="blue">一言コメント</Button>
							</Segment>
						</Form>
					);
				}}
			</Mutation>
		</div>
	);
};

export default CommentContainer;
