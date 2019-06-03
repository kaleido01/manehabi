import React, { Fragment, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Comment, Segment, Button } from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";
import DeleteHabitModal from "./DeleteHabitModal";
import StarLabel from "./StarLabel";
import UpdateHabitModal from "./updateHabitModal";
import moment from "moment";
import { AnimationFrameScheduler } from "rxjs/internal/scheduler/AnimationFrameScheduler";
import { convertNodeHttpToRequest } from "apollo-server-core";

const Habit = ({ habit, match }) => {
	const [updateOpen, setUpdateOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
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

			console.log(updateDate);

			return +updateDate >= startDate && updateDate <= endDate;
		}
	};

	return (
		<Fragment>
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
								<div>{habit.startDate}</div>
							</Comment.Metadata>
							<Comment.Text>{habit.title}</Comment.Text>
							<Link to={`/habit/${habit._id}`}>
								<Button color="green">詳細</Button>
							</Link>
							{isMyHabit ? (
								<Fragment>
									<Button
										color="olive"
										onClick={() => setUpdateOpen(true)}
										disabled={checkDisable(habit)}>
										{checkDisable(habit) ? "更新済み" : "更新"}
									</Button>
									<Button
										color="red"
										onClick={() => setDeleteOpen(convertNodeHttpToRequest)}>
										削除
									</Button>
								</Fragment>
							) : null}
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
					/>
					<UpdateHabitModal
						open={updateOpen}
						habit={habit}
						closeModal={() => setUpdateOpen(AnimationFrameScheduler)}
					/>
				</Fragment>
			) : null}
		</Fragment>
	);
};

export default withRouter(Habit);
