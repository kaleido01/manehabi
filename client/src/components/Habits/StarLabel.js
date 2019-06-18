import React, { useEffect, useState, useContext, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../";

import { Label, Icon, Message, Transition } from "semantic-ui-react";
import "./Habits.css";
import { Mutation } from "react-apollo";
import { STAR_HABIT, UNSTAR_HABIT } from "./../../queries/index";

const StarLabel = ({ habit, history }) => {
	const [stared, setStar] = useState(false);
	const [starLength, setStarLength] = useState(habit.starUser.length);
	const [errors, setErrors] = useState([]);
	const [onOpen, setOnOpen] = useState(false);
	const currentUser = useContext(UserContext);
	useEffect(() => {
		if (currentUser) {
			currentUser.favorites.forEach(({ _id }) => {
				if (habit._id === _id) setStar(true);
			});
		}
	}, []);

	const handleClick = (starHabit, unStarHabit) => {
		// if (!currentUser) {
		// 	history.push("/signin");
		// }
		if (stared) {
			unStarHabit().then(({ data }) => {
				setStar(!stared);
				setStarLength(data.unStarHabit.starUser.length);
			});
		} else {
			starHabit().then(({ data }) => {
				setStar(!stared);
				setStarLength(data.starHabit.starUser.length);
			});
		}
	};

	return (
		<Fragment>
			{/* error message */}
			{errors.length > 0 && (
				<Transition
					transitionOnMount
					animation="fade"
					visible={onOpen}
					duration={("2000", "2000")}>
					<Message
						negative
						hidden={onOpen}
						size="mini"
						onDismiss={() => setOnOpen(false)}
						header="エラー"
						list={errors.map(error => error.message)}
					/>
				</Transition>
			)}
			<Mutation mutation={UNSTAR_HABIT} variables={{ _id: habit._id }}>
				{(unStarHabit, { data, loading, error }) => {
					if (error) {
						setErrors(error.graphQLErrors[0].data);
						setOnOpen(true);
					}
					let message = null;
					if (loading) {
						message = " 取り消し中...";
					}
					return (
						<Mutation mutation={STAR_HABIT} variables={{ _id: habit._id }}>
							{(starHabit, { data, loading, error }) => {
								if (error) {
									setErrors(error.graphQLErrors[0].data);
									setOnOpen(true);
								}
								if (loading) {
									message = "追加中";
								}
								return (
									<Label
										as="a"
										onClick={() => handleClick(starHabit, unStarHabit)}
										color="purple"
										ribbon="right">
										<Label.Detail>
											<Icon
												name={stared ? "star" : "star outline"}
												color={stared ? "yellow" : null}
												loading={message && true}
											/>{" "}
											{starLength}
											{message
												? message
												: stared
												? " お気に入りの解除"
												: " お気に入りに追加"}
										</Label.Detail>
									</Label>
								);
							}}
						</Mutation>
					);
				}}
			</Mutation>
		</Fragment>
	);
};

export default withRouter(StarLabel);
