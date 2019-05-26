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
	Icon
} from "semantic-ui-react";
import "./Auth.css";

class Signin extends React.Component {
	state = {
		email: "",
		password: "",
		errors: []
	};

	componentDidMount() {}

	isFormValid = () => {
		const errors = [];
		let error;
		let valid = true;
		if (this.isFormEmpty(this.state)) {
			error = { message: "全てのフィールドを埋めてください" };
			this.setState({ errors: errors.concat(error) });
			valid = false;
		}
		if (!this.isPasswordValid(this.state)) {
			error = { message: "パスワードが不正です" };
			this.setState({ errors: errors.concat(error) });
			valid = false;
		}
		return valid;
	};

	isFormEmpty = ({ email, password }) => {
		return !email.length || !password.length;
	};

	isPasswordValid = ({ password }) => {
		if (password < 6) {
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
			createUser().then(async ({ data }) => {
				console.log(data);
				localStorage.setItem("token", data.login.token);
				await this.props.refetch();
				this.props.history.push("/habits");
			});
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};

	render() {
		const { email, password, errors } = this.state;
		return (
			<Mutation mutation={LOGIN} variables={{ email, password }}>
				{(login, { data, loading, error }) => {
					if (error) {
						console.log(error, data);
					}
					return (
						<Grid className="Auth" textAlign="center" verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 367 }}>
								<Header as="h2" icon color="purple" textAlign="center">
									<Icon name="new pied piper" color="purple" /> Manehabi
									ログイン
								</Header>
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
									</Segment>
								</Form>
								{errors.length > 0 && (
									<Message error>
										<h3>エラー</h3>
										{console.log(errors)}
										{this.displayErrors(errors)}
									</Message>
								)}
								<Message>
									会員登録がまだの方は
									<Link to="/signup"> こちらから会員登録</Link>
								</Message>
							</Grid.Column>
						</Grid>
					);
				}}
			</Mutation>
		);
	}
}

export default withRouter(Signin);
