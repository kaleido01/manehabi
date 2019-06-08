import React, { useContext, useState } from "react";
import {
	Grid,
	Segment,
	Header,
	Card,
	Image,
	Form,
	Button
} from "semantic-ui-react";
import { UserContext } from "./../../index";

const Profile = () => {
	const currentUser = useContext(UserContext);
	const [username, setUsername] = useState(currentUser.username);
	const [email, setEmail] = useState(currentUser.email);

	return (
		<Grid textAlign="center">
			<Grid.Column width={15} textAlign="center">
				<Segment textAlign="center">
					<Header dividing content="プロフィール" />
					<Card raised style={{ margin: "0 auto" }}>
						<Image
							src={currentUser.imageUrl}
							size="small"
							style={{ margin: "0.5em auto" }}
						/>
						<Card.Content>
							<Card.Meta>加入日 : {currentUser.joinDate}</Card.Meta>
							<Form>
								<Form.Input
									fluid
									name="username"
									icon="edit"
									iconPosition="left"
									placeholder="ユーザー名"
									label="ユーザー名"
									onChange={event => setUsername(event.target.username)}
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
									onChange={event => setEmail(event.target.email)}
									value={email}
									// className={this.handleInputError(errors, "Eメール")}
									type="email"
								/>
								<Button color="teal">更新</Button>
							</Form>
							<Card.Description />
						</Card.Content>
					</Card>
				</Segment>
				<Segment>
					<Header>
						<Card.Group>cccc</Card.Group>
					</Header>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default Profile;
