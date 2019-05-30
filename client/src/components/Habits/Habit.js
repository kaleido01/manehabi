import React, { Fragment, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Comment, Segment, Button, Label } from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";
import DeleteHabitModal from "./DeleteHabitModal";
import StarLabel from "./StarLabel";

const Habit = ({ habit, match }) => {
	const [open, setOpen] = useState(false);
	const currentUser = useContext(UserContext);
	const myHabit = currentUser && currentUser._id === habit.creator._id;
	const isMyHabit = match.path === "/myhabits";

	const closeModal = () => {
		setOpen(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	return (
		<Fragment>
			<Segment.Group raised style={{ margin: "1em" }}>
				<Segment attached="top" color={myHabit ? "orange" : "teal"}>
					<StarLabel />
				</Segment>

				<Segment attached="bottom" textAlign="center">
					<Comment className="Habit">
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
									<Button color="olive">更新</Button>
									<Button color="red" onClick={openModal}>
										削除
									</Button>
								</Fragment>
							) : null}
						</Comment.Content>
					</Comment>
				</Segment>
			</Segment.Group>
			{isMyHabit ? (
				<DeleteHabitModal open={open} habit={habit} closeModal={closeModal} />
			) : null}
		</Fragment>
	);
};

export default withRouter(Habit);
