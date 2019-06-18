import React, { useState } from "react";
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

const CreateHabit = ({ history }) => {
	const [onOpen, setOnOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [units, setUnits] = useState([""]);
	const [errors, setErrors] = useState([]);

	console.log(errors);

	const isFormValid = () => {
		return true;
	};
	const handleSubmit = (event, createHabit) => {
		event.preventDefault();
		if (isFormValid()) {
			createHabit()
				.then(async ({ data }) => {})
				.catch(({ errors }) => {
					console.log(errors);
				});
		}
	};

	const displayErrors = errors => {
		return errors.map((error, i) => {
			return <div key={i}>{error.message}</div>;
		});
	};

	const handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};

	const handleAddUnit = () => {
		const newUnits = [...units];
		newUnits.push("");
		setUnits(newUnits);
	};
	const handleRemoveUnit = () => {
		const newUnits = [...units];
		newUnits.pop();
		setUnits(newUnits);
	};

	const handleUnitsChange = (e, index) => {
		const newUnits = [...units];
		newUnits[index] = e.target.value;
		setUnits(newUnits);
	};

	const renderUnits = () => {
		return units.map((unit, index) => {
			const unit_name = "unit_name" + index;
			return (
				<Form.Input
					key={index}
					name={unit_name}
					icon="tags"
					iconPosition="left"
					placeholder="習慣の単位 (例: 文字)"
					onChange={e => handleUnitsChange(e, index)}
					className={handleInputError(errors, "単位")}
					value={unit}
					type="text"
				/>
			);
		});
	};
	return (
		<Grid className="Auth" textAlign="center" verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 367 }}>
				<Header as="h2" icon color="purple" textAlign="center">
					<Icon name="tag" color="purple" /> 新しい習慣を作成しよう
				</Header>
				{onOpen ? null : (
					<Mutation
						// errorPolicy="all"
						mutation={CREATE_HABIT}
						variables={{ title, description, units }}
						refetchQueries={[
							{ query: GET_ALL_HABITS, variables: { offset: 0, limit: 5 } },
							{ query: GET_USER_HABITS, variables: { offset: 0, limit: 5 } }
						]}
						onCompleted={() => setOnOpen(true)}>
						{(createHabit, { data, loading, error }) => {
							if (error) {
								setErrors(error.graphQLErrors[0].data);
							}
							return (
								<Form size="large">
									<Segment stacked>
										<Form.Input
											fluid
											name="title"
											icon="thumbtack"
											iconPosition="left"
											placeholder="習慣のタイトル"
											onChange={e => setTitle(e.target.value)}
											value={title}
											className={handleInputError(errors, "タイトル")}
											type="text"
										/>
										<Form.TextArea
											name="description"
											placeholder="習慣の説明"
											onChange={e => setDescription(e.target.value)}
											value={description}
											className={handleInputError(errors, "説明")}
											type="text"
										/>
										<Grid columns={3} style={{ margin: "0.01em 0" }}>
											<Grid.Column>
												<strong>習慣の単位(任意個数)</strong>
											</Grid.Column>
											<GridColumn>
												<Button
													color="blue"
													icon="add"
													onClick={handleAddUnit}
												/>
											</GridColumn>
											<GridColumn>
												<Button
													icon="remove"
													color="red"
													onClick={handleRemoveUnit}
												/>
											</GridColumn>
										</Grid>
										{renderUnits()}

										<Button
											disabled={loading}
											className={loading ? "loading" : ""}
											color="orange"
											size="large"
											onClick={event => handleSubmit(event, createHabit)}
											fluid>
											作成
										</Button>
									</Segment>
								</Form>
							);
						}}
					</Mutation>
				)}
				{console.log(errors)}
				{errors.length > 0 && (
					<Message error>
						<h3>エラー</h3>
						{displayErrors(errors)}
					</Message>
				)}
				{/* success message */}
				<Transition
					animation="fade"
					visible={onOpen}
					duration="2000"
					onComplete={() => history.push("/habits")}>
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
};

export default withRouter(CreateHabit);
