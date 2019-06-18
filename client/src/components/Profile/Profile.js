import React, { useContext, useState } from "react";
import {
	Grid,
	Segment,
	Header,
	Card,
	Image,
	Form,
	Button,
	Transition,
	Message,
	Icon
} from "semantic-ui-react";
import { UserContext } from "./../../index";
import { Mutation } from "react-apollo";
import { UPDATE_PROFILE } from "../../queries";
import Loader from "../shered/Loader";

const Profile = () => {
	const currentUser = useContext(UserContext);
	const [username, setUsername] = useState(currentUser.username);
	const [email, setEmail] = useState(currentUser.email);
	const [oneWord, setOneWord] = useState(currentUser.oneWord);
	const [description, setDescription] = useState(currentUser.description);
	const [onOpen, setOnOpen] = useState(false);

	const handleSubmit = (event, updateProfile) => {
		event.preventDefault();
		updateProfile()
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<Mutation
			mutation={UPDATE_PROFILE}
			variables={{ username, email, oneWord }}
			onCompleted={() => setOnOpen(true)}>
			{(updateProfile, { data, loading }) => {
				if (loading) return <Loader />;
				return (
					<Grid textAlign="center">
						<Grid.Column width={15} textAlign="center">
							<Segment textAlign="center">
								<Header dividing content="プロフィール" />
								<Transition
									animation="swing right"
									visible={onOpen}
									duration="500"
									onComplete={() =>
										setTimeout(() => {
											setOnOpen(false);
										}, 2000)
									}>
									<Message
										size="small"
										compact
										success
										onDismiss={() => setOnOpen(false)}
										style={{ maxwidth: "250px" }}>
										<Message.Content>
											<Icon name="check" />
											<span>プロフィール変更完了</span>{" "}
										</Message.Content>
									</Message>
								</Transition>
								<Card raised style={{ margin: "0 auto" }}>
									<Image
										src={currentUser.imageUrl}
										size="small"
										style={{ margin: "0.5em auto" }}
									/>
									<Card.Content>
										<Card.Meta>加入日 : {currentUser.joinDate}</Card.Meta>
										<Form
											onSubmit={event => handleSubmit(event, updateProfile)}>
											<Form.Input
												fluid
												name="username"
												icon="edit"
												iconPosition="left"
												placeholder="ユーザー名"
												label="ユーザー名"
												onChange={event => setUsername(event.target.value)}
												value={username}
												// className={this.handleInputError(errors, "Eメール")}
												type="text"
											/>
											<Form.Input
												fluid
												name="email"
												icon="mail"
												iconPosition="left"
												placeholder="Eメールアドレス"
												label="Eメールアドレス"
												onChange={event => setEmail(event.target.value)}
												value={email}
												// className={this.handleInputError(errors, "Eメール")}
												type="email"
											/>
											<Form.Input
												fluid
												name="oneWord"
												icon="edit"
												iconPosition="left"
												placeholder="一言コメント"
												label="一言コメント"
												onChange={event => setOneWord(event.target.value)}
												value={oneWord}
												type="text"
											/>
											<Form.TextArea
												fluid
												name="oneWord"
												icon="edit"
												iconPosition="left"
												placeholder="自己紹介"
												label="自己紹介"
												onChange={event => setDescription(event.target.value)}
												value={description}
												type="text"
											/>
											<Button color="teal">更新</Button>
										</Form>
										<Card.Description />
									</Card.Content>
								</Card>
							</Segment>
						</Grid.Column>
					</Grid>
				);
			}}
		</Mutation>
	);
};

export default Profile;
