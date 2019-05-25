import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../queries";
import { Link } from "react-router-dom";
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

class Signup extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
		errors: [],
		loading: false
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (event, createUser) => {
		event.preventDefault();
		createUser().then(async ({ data }) => {
			console.log(data);
			localStorage.setItem("token", data.createUser.token);
			this.props.history.push("/habits");
		});
	};

	handleInputError = () => {};

	render() {
		const {
			username,
			email,
			password,
			passwordConfirmation,
			errors
		} = this.state;
		return (
			<Mutation
				mutation={CREATE_USER}
				variables={{ username, email, password }}>
				{(createUser, { data, loading, error }) => {
					if (error) {
						console.log(error);
					}
					return (
						<Grid className="Auth" textAlign="center" verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 367 }}>
								<Header as="h2" icon color="purple" textAlign="center">
									<Icon name="new pied piper" color="purple" /> Manehabi
									会員登録
								</Header>
								<Form
									size="large"
									onSubmit={event => this.handleSubmit(event, createUser)}>
									<Segment stacked>
										<Form.Input
											fluid
											name="username"
											icon="user"
											iconPosition="left"
											placeholder="ユーザ名"
											onChange={this.handleChange}
											value={username}
											className={this.handleInputError(errors, "ユーザー")}
											type="text"
										/>
										<Form.Input
											fluid
											name="email"
											icon="mail"
											iconPosition="left"
											placeholder="Eメールアドレス"
											onChange={this.handleChange}
											value={email}
											className={this.handleInputError(errors, "Eメール")}
											type="text"
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
											type="text"
										/>
										<Form.Input
											fluid
											name="passwordConfirmation"
											icon="repeat"
											iconPosition="left"
											placeholder="パスワードの確認"
											onChange={this.handleChange}
											value={passwordConfirmation}
											className={this.handleInputError(errors, "パスワード")}
											type="text"
										/>
										<Button
											disabled={loading}
											className={loading ? "loading" : ""}
											color="orange"
											size="large"
											fluid>
											会員登録
										</Button>
									</Segment>
								</Form>
								<Message>
									既に会員登録済みの方は
									<Link to="signin"> こちらからログイン</Link>
								</Message>
							</Grid.Column>
						</Grid>
					);
				}}
			</Mutation>
		);
	}
}

export default Signup;
