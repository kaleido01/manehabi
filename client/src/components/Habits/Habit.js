import React, { Fragment, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Comment, Segment, Button, Modal, Icon } from "semantic-ui-react";
import "./Habits.css";
import { UserContext } from "./../../index";

const Habit = ({ habit, match }) => {
	const [open, setOpen] = useState(false);
	const currentUser = useContext(UserContext);
	const myHabit = currentUser && currentUser._id === habit.creator._id;
	const isMyHabit = match.path === "/myhabits";

	const deleteHabit = () => {};

	const closeModal = () => {
		setOpen(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	return (
		<Fragment>
			<Segment
				padded
				raised
				color={myHabit ? "orange" : "teal"}
				style={{ margin: "1em" }}
				textAlign="center">
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

			<Modal basic open={open} onClose={closeModal}>
				<Modal.Header>習慣削除の確認</Modal.Header>
				<Modal.Content>{habit.title}を削除してよろしいですか？</Modal.Content>
				<Modal.Actions>
					<Button color="red" inverted onClick={deleteHabit}>
						<Icon name="checkmark" />
					</Button>
					<Button color="orange" inverted onClick={closeModal}>
						<Icon name="remove" />
					</Button>
				</Modal.Actions>
			</Modal>
		</Fragment>
	);
};

export default withRouter(Habit);
