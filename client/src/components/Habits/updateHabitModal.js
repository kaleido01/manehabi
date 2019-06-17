import React, { useState, useEffect } from "react";
import { Modal, Button, Icon, Input } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import {
	UPDATE_HABIT,
	GET_ALL_HABITS,
	GET_USER_HABITS,
	GET_HABIT
} from "../../queries";
import Loader from "./../shered/Loader";

const UpdateHabitModal = ({ closeModal, habit, open }) => {
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
	console.log(habit.habitRecords);
	console.log(todayRecords);

	const handleUpdateHabit = (updateHabit, closeModal) => {
		updateHabit()
			.then(data => {})
			.catch(err => {
				console.log(err);
				closeModal();
			});
	};

	const handleChange = (e, index) => {
		const newTodayRecords = [...todayRecords];
		console.log(newTodayRecords);
		newTodayRecords[index].today = +e.target.value;
		setTodayRecords(newTodayRecords);
	};

	console.log(todayRecords.length);
	const renderUnit = () => {
		return (
			todayRecords.length !== 0 &&
			habit.habitRecords.map((habitRecord, index) => {
				const { unit, recordNumber } = habitRecord;
				console.log(index);
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
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>{habit.title}の更新</Modal.Header>
						<Modal.Content>
							{habit.title}の積み上げを更新しましょう！
							{renderUnit()}
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
