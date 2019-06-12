import React, { useState } from "react";
import { CREATE_COMMENT } from "./../../../../queries/index";
import { Form, Segment, Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";

const CommentContainer = ({ creatorId, habitId }) => {
	const [body, setBody] = useState("");

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
				variables={{ body, creatorId, habitId }}>
				{(createComment, { data, loading }) => {
					return (
						<Form
							onSubmit={event => handleSubmit(event, createComment)}
							size="large">
							<Segment>
								<Form.Input
									fluid
									name="body"
									icon="mail"
									iconPosition="left"
									placeholder="Eメールアドレス"
									onChange={event => setBody(event.target.value)}
									value={body}
									// className={this.handleInputError(errors, "Eメール")}
									type="text"
								/>
								<Button color="blue">コメント</Button>
							</Segment>
						</Form>
					);
				}}
			</Mutation>
		</div>
	);
};

export default CommentContainer;
