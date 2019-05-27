import React, { Component } from "react";
import {
	Grid,
	Header,
	Icon,
	Form,
	Segment,
	Button,
	Message,
	Transition
} from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { CREATE_HABIT } from "../../queries";

export class CreateHabit extends Component {
	state = {
		onOpen: false,
		title: "",
		description: "",
		errors: []
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	isFormValid = () => {
		return true;
	};
	handleSubmit = (event, createHabit) => {
		event.preventDefault();
		if (this.isFormValid()) {
			createHabit().then(async ({ data }) => {
				console.log(data);
				this.setState({ errors: [] });
			});
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};
	render() {
		const { onOpen, title, description, errors } = this.state;
		return (
			<Grid className="Auth" textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 367 }}>
					<Header as="h2" icon color="purple" textAlign="center">
						<Icon name="new pied piper" color="purple" /> 新しい習慣を作成しよう
					</Header>
					{onOpen ? null : (
						<Mutation
							mutation={CREATE_HABIT}
							variables={{ title, description }}
							onCompleted={() => this.setState({ onOpen: true })}>
							{(createHabit, { data, loading, error }) => {
								if (error) {
									console.log(error, data);
								}
								return (
									<Form
										size="large"
										onSubmit={event => this.handleSubmit(event, createHabit)}>
										<Segment stacked>
											<Form.Input
												fluid
												name="title"
												icon="mail"
												iconPosition="left"
												placeholder="習慣のタイトル"
												onChange={this.handleChange}
												value={title}
												className={this.handleInputError(errors, "Eメール")}
												type="text"
											/>
											<Form.TextArea
												name="description"
												placeholder="習慣の説明"
												onChange={this.handleChange}
												value={description}
												className={this.handleInputError(errors, "パスワード")}
												type="text"
											/>
											<Button
												disabled={loading}
												className={loading ? "loading" : ""}
												color="orange"
												size="large"
												fluid>
												作成
											</Button>
										</Segment>
									</Form>
								);
							}}
						</Mutation>
					)}

					{errors.length > 0 && (
						<Message error>
							<h3>エラー</h3>
							{console.log(errors)}
							{this.displayErrors(errors)}
						</Message>
					)}

					{/* success message */}
					<Transition
						animation="fade"
						visible={onOpen}
						duration="2000"
						onComplete={() => this.props.history.push("/habits")}>
						<Message icon success size="massive">
							<Message.Content>
								<Icon name="check" />
								<Message.Header>新しい習慣を作成しました</Message.Header>
								記念すべき1日目を更新しよう
							</Message.Content>
						</Message>
					</Transition>
				</Grid.Column>
			</Grid>
		);
	}
}

export default CreateHabit;
