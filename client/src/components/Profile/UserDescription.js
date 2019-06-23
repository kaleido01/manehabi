import React from "react";
import { Card, Image, Header, Divider, Grid } from "semantic-ui-react";
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
						<Grid.Row>
							<Card style={{ margin: "1em auto" }}>
								<Card.Content>
									<Image floated="right" size="mini" src={imageUrl} />
									<Card.Header>{username}</Card.Header>
									<Card.Meta>{joinDate}から利用しています</Card.Meta>
									<Card.Description>一言:{oneWord}</Card.Description>
									<Divider />
									<Card.Description>{description}</Card.Description>
								</Card.Content>
							</Card>
						</Grid.Row>
						<Grid.Column width={12} style={{ minWidth: "350px" }}>
							<Header>作成した習慣一覧</Header>

							<UserHabitList habits={habits} />
						</Grid.Column>
					</Grid>
				);
			}}
		</Query>
	);
};

export default UserDescription;
