import React from "react";
import {
	Segment,
	Item,
	Label,
	Icon,
	Divider,
	Grid,
	Button
} from "semantic-ui-react";
import moment from "moment";
import StarButton from "../StarButton";

const Description = ({ habit }) => {
	return (
		<Segment.Group>
			<Segment attached="top">
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Header>タイトル : {habit.title}</Item.Header>
							<Item.Description>説明 : {habit.description}</Item.Description>
						</Item.Content>
						<Label
							style={{ marginTop: "1.5em" }}
							className="Description"
							ribbon="right"
							color="orange"
							content={`${habit.countDate} 日間継続中`}
						/>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<Icon name="clock" />
				習慣が登録された日 : {moment(+habit.createdAt).format("YYYY-MM-DD")}
				<Divider />
				<Icon name="play" />
				習慣を新しく始めた日 : {moment(+habit.startDate).format("YYYY-MM-DD")}
				<Divider />
				<Icon name="check" />
				習慣を最後に更新した日 :{" "}
				{habit.updateDate
					? moment(+habit.updateDate).format("YYYY-MM-DD")
					: "未更新"}
				<Divider />
				<Icon name="redo" />
				挫折した回数 : {habit.numberOfFailure}
				<Divider />
				<Grid.Column computer={5} tablet={5} mobile={8} floated="left">
					<Icon name="star" color="yellow" />
					応援の星 : {habit.starUser.length}
				</Grid.Column>
				<Grid.Column computer={5} tablet={5} mobile={8}>
					<StarButton habit={habit} />
				</Grid.Column>
				<Divider />
				<Button
					as="a"
					color="twitter"
					href="https://twitter.com/share?ref_src=twsrc%5Etfw">
					<script
						async
						src="https://platform.twitter.com/widgets.js"
						charSet="utf-8"
					/>
					<Icon name="twitter" />
					Twitterでシェア
				</Button>
			</Segment>
		</Segment.Group>
	);
};

export default Description;
