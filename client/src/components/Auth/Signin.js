import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN } from "../../queries";
import { Link, withRouter } from "react-router-dom";
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon,
	Transition
} from "semantic-ui-react";
import "./Auth.css";
import { isEmail, isEmpty, isLength } from "validator";

class Signin extends React.Component {
	state = {
		email: "",
		password: "",
		errors: [],
		onOpen: false
	};

	isFormValid = () => {
		const { email, password } = this.state;
		const errors = [];
		let error;
		let valid = true;

		if (!isEmpty(email)) {
			if (!isEmail(email)) {
				error = { message: "Eメールが不正です" };
				errors.push(error);
				valid = false;
			}
		} else {
			error = { message: "Eメールは必須です" };
			errors.push(error);
			valid = false;
		}
		if (!this.isPasswordValid(password)) {
			error = { message: "パスワードが不正です" };
			errors.push(error);
			valid = false;
		}
		this.setState({ errors });
		return valid;
	};
	isPasswordValid = password => {
		if (isEmpty(password)) {
			return false;
		}
		if (!isLength(password, { min: 6 })) {
			return false;
		}
		return true;
	};

	displayErrors = errors => {
		return errors.map((error, i) => <p key={i}>{error.message}</p>);
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (event, createUser) => {
		event.preventDefault();
		if (this.isFormValid()) {
			this.setState({ errors: [] });
			createUser().then(async ({ data }) => {
				localStorage.setItem("token", data.login.token);
				await this.props.refetch();
			});
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};

	render() {
		const { email, password, errors, onOpen } = this.state;
		console.log("test");

		return (
			<Grid className="Auth" textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 367 }}>
					<Header as="h2" icon color="purple" textAlign="center">
						<Icon name="new pied piper" color="purple" /> Manehabi ログイン
					</Header>
					{onOpen ? null : (
						<Mutation
							mutation={LOGIN}
							variables={{ email, password }}
							onCompleted={() => this.setState({ onOpen: true })}>
							{(login, { data, loading, error }) => {
								if (errors.length === 0) {
									if (error) {
										this.setState({ errors: error.graphQLErrors[0].data });
									}
								}
								return (
									<Form
										size="large"
										onSubmit={event => this.handleSubmit(event, login)}>
										<Segment stacked>
											<Form.Input
												fluid
												name="email"
												icon="mail"
												iconPosition="left"
												placeholder="Eメールアドレス"
												onChange={this.handleChange}
												value={email}
												className={this.handleInputError(errors, "Eメール")}
												type="email"
											/>
											<Form.Input
												fluid
												name="password"
												icon="lock"
												iconPosition="left"
												placeholder="パスワード"
												onChange={this.handleChange}
												value={password}
												className={this.handleInputError(errors, "パスワード")}
												type="password"
											/>
											<Button
												disabled={loading}
												className={loading ? "loading" : ""}
												color="orange"
												size="large"
												fluid>
												ログイン
											</Button>

											<Button
												disabled={loading}
												className={loading ? "loading" : ""}
												color="twitter"
												size="large"
												style={{ margin: "1em 0 0 0" }}
												fluid
												as="a"
												href="/auth/twitter">
												<Icon name="twitter" /> Twitterでログインする
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
							{this.displayErrors(errors)}
						</Message>
					)}
					{onOpen ? null : (
						<Message>
							会員登録がまだの方は
							<Link to="/signup"> こちらから会員登録</Link>
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
								<Message.Header>ログイン成功</Message.Header>
								ようこそ.Manehabiへ
							</Message.Content>
						</Message>
					</Transition>
				</Grid.Column>
			</Grid>
		);
	}
}

export default withRouter(Signin);
