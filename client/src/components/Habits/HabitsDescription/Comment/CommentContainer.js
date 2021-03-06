import React, { useState } from "react";
import { CREATE_COMMENT, GET_MESSAGES } from "./../../../../queries/index";
import {
	Form,
	Segment,
	Button,
	TextArea,
	Icon,
	Transition,
	Message
} from "semantic-ui-react";
import { Mutation } from "react-apollo";

const CommentContainer = ({ creatorId, habit, commentOptions }) => {
	const [body, setBody] = useState(`${habit.countDate}日目 :`);
	const [errors, setErrors] = useState([]);
	const [onOpen, setOnOpen] = useState(false);

	const handleSubmit = (event, createComment) => {
		event.preventDefault();
		createComment().then(res => {});
	};

	return (
		<div>
			{errors.length > 0 && (
				<Transition
					transitionOnMount
					animation="fade"
					visible={onOpen}
					duration={("2000", "2000")}>
					<Message
						negative
						hidden={onOpen}
						size="mini"
						onDismiss={() => setOnOpen(false)}
						header="エラー"
						list={errors.map(error => error.message)}
					/>
				</Transition>
			)}
			<Mutation
				mutation={CREATE_COMMENT}
				variables={{ body, creatorId, habitId: habit._id }}
				refetchQueries={[
					{
						query: GET_MESSAGES,
						variables: {
							_id: habit._id,
							offset: 0,
							limit: 5,
							...commentOptions
						}
					}
				]}>
				{(createComment, { data, loading, error }) => {
					if (error) {
						setErrors(error.graphQLErrors[0].data);
						setOnOpen(true);
					}
					return (
						<Form
							onSubmit={event => handleSubmit(event, createComment)}
							size="large">
							<Segment loading={loading}>
								<TextArea
									name="body"
									placeholder=""
									onChange={event => setBody(event.target.value)}
									value={body}
									// className={this.handleInputError(errors, "Eメール")}
									type="textInput"
								/>
								<Button
									color="blue"
									style={{ marginTop: "0.5em" }}
									disabled={loading}>
									<Icon name="external alternate" /> 一言コメント
								</Button>
							</Segment>
						</Form>
					);
				}}
			</Mutation>
		</div>
	);
};

export default CommentContainer;
