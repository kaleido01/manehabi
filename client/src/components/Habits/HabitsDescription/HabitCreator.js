import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const HabitCreator = ({ habit }) => {
	return (
		<Card style={{ margin: "0 auto" }}>
			<Card.Content>
				<Image floated="right" size="mini" src={habit.creator.imageUrl} />
				<Card.Header>作成者 : {habit.creator.username}</Card.Header>
				<Card.Meta>参加日 : {habit.creator.joinDate}</Card.Meta>
				<Card.Description>{habit.creator.oneWord}</Card.Description>
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
	);
};

export default HabitCreator;
