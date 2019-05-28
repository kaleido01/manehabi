import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { DELETE_HABIT } from "../../queries";
import Loader from "./../shered/Loader";

const deleteHabitModal = ({ closeModal, habit, open }) => {
	const handleDeleteHabit = (deleteHabit, closeModal) => {
		deleteHabit()
			.then(data => {
				console.log(data);
				closeModal();
			})
			.catch(err => {
				console.log(err);
				closeModal();
			});
	};

	return (
		<Mutation mutation={DELETE_HABIT} variables={{ _id: habit._id }}>
			{(deleteHabit, { data, loading, error }) => {
				if (loading) return <Loader />;
				console.log(data);
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>習慣削除の確認</Modal.Header>
						<Modal.Content>
							{habit.title}を削除してよろしいですか？
						</Modal.Content>
						<Modal.Actions>
							<Button
								color="red"
								inverted
								onClick={() => handleDeleteHabit(deleteHabit, closeModal)}>
								<Icon name="checkmark" />
							</Button>
							<Button color="orange" inverted onClick={closeModal}>
								<Icon name="remove" />
							</Button>
						</Modal.Actions>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default deleteHabitModal;
