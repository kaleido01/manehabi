import React, { useState, useEffect } from "react";
import { Modal, Button, Icon, Input, Message } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import {
	UPDATE_HABIT,
	GET_ALL_HABITS,
	GET_USER_HABITS,
	GET_HABIT
} from "../../queries";
import Loader from "./../shered/Loader";

const UpdateHabitModal = ({
	closeModal,
	habit,
	open,
	errors,
	setErrors,
	setOnSuccessMessage
}) => {
	const [todayRecords, setTodayRecords] = useState([]);

	useEffect(() => {
		habit.habitRecords.map(habitRecord => {
			setTodayRecords(prevState => {
				return [
					...prevState,
					{
						recordNumber: habitRecord._id,
						today: 0
					}
				];
			});
		});
	}, []);

	const handleUpdateHabit = (updateHabit, closeModal) => {
		updateHabit()
			.then(data => {
				setOnSuccessMessage(true);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleChange = (e, index) => {
		const newTodayRecords = [...todayRecords];
		newTodayRecords[index].today = +e.target.value;
		setTodayRecords(newTodayRecords);
	};

	const renderUnit = () => {
		return (
			todayRecords.length !== 0 &&
			habit.habitRecords.map((habitRecord, index) => {
				const { unit, recordNumber } = habitRecord;
				return (
					<Input
						fluid
						name={recordNumber}
						iconPosition="left"
						label={`今日の積み上げ${unit}数`}
						placeholder={`今日の積み上げ${unit}数`}
						onChange={e => handleChange(e, index)}
						value={todayRecords[index].today}
						type="number"
						min={0}
						style={{ margin: "1em 0" }}
					/>
				);
			})
		);
	};

	return (
		<Mutation
			mutation={UPDATE_HABIT}
			variables={{ _id: habit._id, todayRecords }}
			onCompleted={closeModal}
			refetchQueries={[
				{ query: GET_ALL_HABITS, variables: { offset: 0, limit: 5 } },
				{ query: GET_USER_HABITS, variables: { offset: 0, limit: 5 } },
				{ query: GET_HABIT, variables: { _id: habit._id } }
			]}
			// update={handleUpdateCache}
		>
			{(updateHabit, { data, loading, error }) => {
				if (loading) return <Loader />;
				if (error) {
					setErrors(error.graphQLErrors[0].data);
				}
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>{habit.title}の更新</Modal.Header>
						<Modal.Content>
							{habit.title}の積み上げを更新しましょう！
							{renderUnit()}
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
								disabled={loading}
								loading={loading}
								icon
								className={loading ? "loading" : ""}
								color="orange"
								size="large"
								onClick={() => handleUpdateHabit(updateHabit, closeModal)}
								inverted>
								<Icon name="external alternate" />
								積み上げ!
							</Button>
							<Button
								disabled={loading}
								className={loading ? "loading" : ""}
								color="red"
								icon
								size="large"
								onClick={closeModal}
								inverted>
								<Icon name="cancel" />
								キャンセル
							</Button>
						</Modal.Actions>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default UpdateHabitModal;
