import React, { Fragment, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {
	Comment,
	Segment,
	Button,
	Grid,
	Message,
	Transition,
	Icon
} from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";
import StarLabel from "./StarLabel";
import DeleteHabitModal from "./DeleteHabitModal";
import UpdateHabitModal from "./UpdateHabitModal";
import ResetCountModal from "./ResetCountModal";
import moment from "moment";

const Habit = ({ habit, match }) => {
	const [updateOpen, setUpdateOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [resetOpen, setResetOpen] = useState(false);
	const [errors, setErrors] = useState([]);
	const [onSuccessMessage, setOnSuccessMessage] = useState(false);
	const currentUser = useContext(UserContext);
	const myHabit = currentUser && currentUser._id === habit.creator._id;
	const isMyHabit = match.path === "/myhabits";

	const checkDisable = habit => {
		if (habit) {
			const updateDate = moment(+habit.updateDate).toDate();
			const startDate = moment(Date.now())
				.startOf("days")
				.toDate();
			const endDate = moment(Date.now())
				.endOf("days")
				.toDate();
			// return false;
			return +updateDate >= startDate && updateDate <= endDate;
		}
	};

	return (
		<Fragment>
			<div className="SuccessMessage">
				<Transition
					animation="swing right"
					visible={onSuccessMessage}
					duration="500"
					onComplete={() =>
						setTimeout(() => {
							setOnSuccessMessage(false);
						}, 2000)
					}>
					<Message
						size="small"
						compact
						success
						onDismiss={() => setOnSuccessMessage(false)}
						style={{ maxwidth: "250px" }}>
						<Message.Content>
							<Icon name="check" />
							<span>正常に処理が完了しました。</span>{" "}
						</Message.Content>
					</Message>
				</Transition>
			</div>
			<Segment.Group raised style={{ margin: "1em" }}>
				<Segment attached="top" color={myHabit ? "orange" : "teal"}>
					<StarLabel habit={habit} />
				</Segment>

				<Segment className="Habit" attached="bottom" textAlign="center">
					<Comment>
						<Comment.Avatar src={habit.creator.imageUrl} />
						<Comment.Content>
							<Comment.Author>{habit.creator.username}</Comment.Author>
							<Comment.Metadata>
								<div>
									作成日時: {moment(+habit.createdAt).format("YYYY-MM-DD")}
								</div>
							</Comment.Metadata>
							<Comment.Text>タイトル: {habit.title}</Comment.Text>
							<Grid as={Comment} textAlign="center" columns={4}>
								<Button
									style={{ margin: "0.5em" }}
									as={Link}
									color="green"
									to={`/habit/${habit._id}`}>
									詳細
								</Button>
								{isMyHabit ? (
									<Fragment>
										<Button
											style={{ margin: "0.5em" }}
											color="olive"
											onClick={() => setUpdateOpen(true)}
											disabled={checkDisable(habit)}>
											{checkDisable(habit) ? "更新済み" : "更新"}
										</Button>
										<Button
											color="red"
											style={{ margin: "0.5em" }}
											onClick={() => setDeleteOpen(true)}>
											削除
										</Button>
										<Button
											color="teal"
											style={{ margin: "0.5em" }}
											onClick={() => setResetOpen(true)}>
											継続リセット
										</Button>
									</Fragment>
								) : null}
							</Grid>
						</Comment.Content>
					</Comment>
				</Segment>
			</Segment.Group>
			{isMyHabit ? (
				<Fragment>
					<DeleteHabitModal
						open={deleteOpen}
						habit={habit}
						closeModal={() => setDeleteOpen(false)}
						errors={errors}
						setErrors={setErrors}
						setOnSuccessMessage={setOnSuccessMessage}
					/>
					<UpdateHabitModal
						open={updateOpen}
						habit={habit}
						closeModal={() => setUpdateOpen(false)}
						errors={errors}
						setErrors={setErrors}
						setOnSuccessMessage={setOnSuccessMessage}
					/>
					<ResetCountModal
						open={resetOpen}
						habit={habit}
						closeModal={() => setResetOpen(false)}
						errors={errors}
						setErrors={setErrors}
						setOnSuccessMessage={setOnSuccessMessage}
					/>
				</Fragment>
			) : null}
		</Fragment>
	);
};

export default withRouter(Habit);
