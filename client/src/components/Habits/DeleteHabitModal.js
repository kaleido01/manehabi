import React from "react";
import { Modal, Button, Icon, Message } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { DELETE_HABIT, GET_USER_HABITS } from "../../queries";
import Loader from "./../shered/Loader";

const DeleteHabitModal = ({
	closeModal,
	habit,
	open,
	errors,
	setErrors,
	setOnSuccessMessage
}) => {
	const handleDeleteHabit = (deleteHabit, closeModal) => {
		deleteHabit()
			.then(data => {
				setOnSuccessMessage(true);

				closeModal();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleUpdateCache = (cache, { data: { deleteHabit } }) => {
		const data = cache.readQuery({
			query: GET_USER_HABITS,
			variables: { offset: 0, limit: 5 }
		});
		const newHabits = data.getUserHabits.habits.filter(
			habit => habit._id !== deleteHabit._id
		);
		cache.writeQuery({
			query: GET_USER_HABITS,
			variables: { offset: 0, limit: 5 },
			data: {
				...data,
				getUserHabits: {
					...data.getUserHabits,
					habits: newHabits,
					pageInfo: data.getUserHabits.pageInfo
				}
			}
		});
	};

	return (
		<Mutation
			mutation={DELETE_HABIT}
			variables={{ _id: habit._id }}
			update={handleUpdateCache}>
			{(deleteHabit, { data, loading, error }) => {
				if (loading) return <Loader />;
				console.log(error);
				if (error) {
					setErrors(error.graphQLErrors[0].data);
				}
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>習慣削除の確認</Modal.Header>
						<Modal.Content>
							{habit.title}を削除してよろしいですか？
							{errors && errors.length > 0 && (
								<Message
									negative
									size="mini"
									header="エラー"
									list={errors.map(error => error.message)}
								/>
							)}
						</Modal.Content>

						<Modal.Actions>
							<Button
								color="red"
								inverted
								onClick={() => handleDeleteHabit(deleteHabit, closeModal)}>
								<Icon name="checkmark" />
								削除
							</Button>
							<Button color="orange" inverted onClick={closeModal}>
								<Icon name="remove" />
								キャンセル
							</Button>
						</Modal.Actions>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default DeleteHabitModal;
