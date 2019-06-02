import React, { Fragment, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Comment, Segment, Button } from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";
import DeleteHabitModal from "./DeleteHabitModal";
import StarLabel from "./StarLabel";
import UpdateHabitModal from "./updateHabitModal";

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
									<Button color="olive" onClick={openModal}>
										更新
									</Button>
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
				<Fragment>
					<DeleteHabitModal open={open} habit={habit} closeModal={closeModal} />
					<UpdateHabitModal open={open} habit={habit} closeModal={closeModal} />
				</Fragment>
			) : null}
		</Fragment>
	);
};

export default withRouter(Habit);
