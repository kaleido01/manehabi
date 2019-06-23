import React, { Fragment } from "react";
import { Card, Image, Button, Divider, Grid } from "semantic-ui-react";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "./../../queries/index";
import { WelcomeLoader } from "../shered/Loader";
import UserHabitList from "./UserHabitList";

const UserDescription = ({ match }) => {
	const { _id } = match.params;

	return (
		<Query query={GET_USER_INFO} variables={{ userId: _id }}>
			{({ data, error, loading }) => {
				if (loading) return <WelcomeLoader />;
				console.log(data);
				const {
					imageUrl,
					username,
					joinDate,
					oneWord,
					description,
					habits
				} = data.getUserInfo;
				return (
					<Grid textAlign="center">
						<Card style={{ margin: "1em auto" }}>
							<Card.Content>
								<Image floated="right" size="mini" src={imageUrl} />
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{joinDate}から利用しています</Card.Meta>
								<Card.Description>一言:{oneWord}</Card.Description>
								<Divider />
								<Card.Description>{description}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Button
									color="green"
									icon="right arrow"
									content="もっと詳しく"
									labelPosition="right"
									fluid
								/>
							</Card.Content>
						</Card>
						<UserHabitList habits={habits} />
					</Grid>
				);
			}}
		</Query>
	);
};

export default UserDescription;
