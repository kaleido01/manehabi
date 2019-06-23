import React from "react";
import { Link } from "react-router-dom";
import {
	Comment,
	Button,
	Segment,
	Grid,
	Header,
	Divider
} from "semantic-ui-react";
import moment from "moment";

const UserHabitList = ({ habits }) => {
	const renderHabitList = habits.map(habit => {
		const { createdAt, title, updateDate, countDate, _id } = habit;
		return (
			<Segment raised color="orange">
				<Comment>
					<Comment.Content>
						<Comment.Text>
							<Header>タイトル: {title}</Header>
						</Comment.Text>
						<Divider />
						<Comment.Metadata>
							<div>作成日時: {moment(+createdAt).format("YYYY-MM-DD")}</div>
							<div>
								最終更新日:{" "}
								{updateDate
									? moment(+updateDate).format("YYYY-MM-DD")
									: "まだ一度も更新されていません"}
							</div>
							<div>継続日数: {countDate}</div>
						</Comment.Metadata>
					</Comment.Content>
				</Comment>
			</Segment>
		);
	});
	return (
		<Grid textAlign="center" style={{ marginTop: "1em" }}>
			<Grid.Column width={12} style={{ minWidth: "350px" }}>
				<Header>作成した習慣一覧</Header>
				<Segment>{renderHabitList}</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default UserHabitList;
