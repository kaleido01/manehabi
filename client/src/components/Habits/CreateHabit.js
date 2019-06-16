import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
	Grid,
	Header,
	Icon,
	Form,
	Segment,
	Button,
	Message,
	Transition,
	GridColumn
} from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { CREATE_HABIT, GET_ALL_HABITS, GET_USER_HABITS } from "../../queries";

export class CreateHabit extends Component {
	state = {
		onOpen: false,
		title: "",
		description: "",
		units: [""],
		errors: [],
		onError: false
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
			createHabit()
				.then(async ({ data }) => {
					this.setState({ errors: [] });
				})
				.catch(err => {
					this.setState({ onError: true });
					setTimeout(() => {
						this.setState({ onError: false });

						this.props.history.push("/signin");
					}, 2000);
				});
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};

	handleAddUnit = () => {
		const newUnits = [...this.state.units];
		newUnits.push("");
		this.setState({ units: newUnits });
	};
	handleRemoveUnit = () => {
		const newUnits = [...this.state.units];
		newUnits.pop();
		this.setState({ units: newUnits });
	};

	handleUnitsChange = (e, index) => {
		const newUnits = [...this.state.units];
		newUnits[index] = e.target.value;
		this.setState({ units: newUnits });
	};

	renderUnits = () => {
		const { units } = this.state;
		return units.map((unit, index) => {
			const unit_name = "unit_name" + index;
			return (
				<Form.Input
					key={index}
					name={unit_name}
					icon="tags"
					iconPosition="left"
					placeholder="習慣の単位 (例: 文字)"
					onChange={e => this.handleUnitsChange(e, index)}
					value={unit}
					type="text"
				/>
			);
		});
	};
	render() {
		const { onOpen, title, description, errors, units } = this.state;
		return (
			<Grid className="Auth" textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 367 }}>
					<Header as="h2" icon color="purple" textAlign="center">
						<Icon name="tag" color="purple" /> 新しい習慣を作成しよう
					</Header>
					{onOpen ? null : (
						<Mutation
							mutation={CREATE_HABIT}
							variables={{ title, description, units }}
							refetchQueries={[
								{ query: GET_ALL_HABITS, variables: { offset: 0, limit: 5 } },
								{ query: GET_USER_HABITS, variables: { offset: 0, limit: 5 } }
							]}
							onCompleted={() => this.setState({ onOpen: true })}>
							{(createHabit, { data, loading, error }) => {
								return (
									<Form size="large">
										<Segment stacked>
											<Form.Input
												fluid
												name="title"
												icon="thumbtack"
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
											<Grid columns={3}>
												<Grid.Column>
													<strong>習慣の単位(任意個数)</strong>
												</Grid.Column>
												<GridColumn>
													<Button
														color="blue"
														icon="add"
														onClick={this.handleAddUnit}
													/>
												</GridColumn>
												<GridColumn>
													<Button
														icon="remove"
														color="red"
														onClick={this.handleRemoveUnit}
													/>
												</GridColumn>
											</Grid>
											{this.renderUnits()}

											<Button
												disabled={loading}
												className={loading ? "loading" : ""}
												color="orange"
												size="large"
												onClick={event => this.handleSubmit(event, createHabit)}
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
					{/* Error Message */}
					{this.state.onError && (
						<Message>セッションがきれました。ログインしてください</Message>
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

export default withRouter(CreateHabit);
