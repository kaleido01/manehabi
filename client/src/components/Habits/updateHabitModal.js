import React, { useState } from "react";
import { Modal, Button, Icon, Form, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { GET_USER_HABITS, UPDATE_HABIT } from "../../queries";
import Loader from "./../shered/Loader";

const UpdateHabitModal = ({ closeModal, habit, open }) => {
	const [time, setTime] = useState("");

	const handleUpdateHabit = (updateHabit, closeModal) => {
		updateHabit()
			.then(data => {
				console.log(data);
				closeModal();
			})
			.catch(err => {
				console.log(err);
				closeModal();
			});
	};

	// const handleUpdateCache = (cache, { data: { deleteHabit } }) => {
	// 	const data = cache.readQuery({
	// 		query: GET_USER_HABITS,
	// 		variables: { offset: 0, limit: 5 }
	// 	});
	// 	console.log(data);
	// 	console.log(deleteHabit);
	// 	const newHabits = data.getUserHabits.habits.filter(
	// 		habit => habit._id !== deleteHabit._id
	// 	);
	// 	console.log(newHabits);
	// 	cache.writeQuery({
	// 		query: GET_USER_HABITS,
	// 		variables: { offset: 0, limit: 5 },
	// 		data: {
	// 			...data,
	// 			getUserHabits: {
	// 				...data.getUserHabits,
	// 				habits: newHabits,
	// 				pageInfo: data.getUserHabits.pageInfo
	// 			}
	// 		}
	// 	});
	// };

	return (
		<Mutation
			mutation={UPDATE_HABIT}
			variables={{ _id: habit._id, today: +time }}
			// update={handleUpdateCache}
		>
			{(updateHabit, { data, loading, error }) => {
				if (loading) return <Loader />;
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>{habit.title}の更新</Modal.Header>
						<Modal.Content>
							{habit.title}の積み上げ時間を記入しましょう！
							<Form
								size="large"
								onSubmit={event => handleUpdateHabit(updateHabit, closeModal)}>
								<Segment stacked>
									<Form.Input
										fluid
										name="time"
										icon="time"
										iconPosition="left"
										placeholder="今日の積み上げ時間"
										onChange={event => setTime(event.target.value)}
										value={time}
										type="number"
										min={0}
									/>
									<Button
										disabled={loading}
										className={loading ? "loading" : ""}
										color="orange"
										size="large"
										fluid>
										積み上げ!
									</Button>
								</Segment>
							</Form>
						</Modal.Content>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default UpdateHabitModal;
