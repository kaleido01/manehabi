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
						<Button
							style={{ margin: "0.5em" }}
							as={Link}
							color="green"
							to={`/habit/${_id}`}>
							習慣の詳細
						</Button>
					</Comment.Content>
				</Comment>
			</Segment>
		);
	});
	return <Segment>{renderHabitList}</Segment>;
};

export default UserHabitList;
