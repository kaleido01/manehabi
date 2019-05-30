import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../";

import { Label, Icon } from "semantic-ui-react";
import "./Habits.css";
import { Mutation } from "react-apollo";
import { STAR_HABIT, UNSTAR_HABIT } from "./../../queries/index";
import Loader from "../shered/Loader";

const StarLabel = ({ habit }) => {
	const [stared, setStar] = useState(false);
	const [starLength, setStarLength] = useState(habit.starUser.length);
	const currentUser = useContext(UserContext);
	console.log(habit.starUser);
	useEffect(() => {
		if (currentUser) {
			currentUser.favorites.forEach(({ _id }) => {
				if (habit._id === _id) setStar(true);
			});
		}
	}, []);

	const handleClick = (starHabit, unStarHabit) => {
		if (stared) {
			unStarHabit().then(({ data }) => {
				console.log(data.unStarHabit.starUser);
				setStar(!stared);
				setStarLength(data.unStarHabit.starUser.length);
			});
		} else {
			starHabit().then(({ data }) => {
				console.log(data.starHabit.starUser);
				setStar(!stared);
				setStarLength(data.starHabit.starUser.length);
			});
		}
	};

	return (
		<Mutation mutation={UNSTAR_HABIT} variables={{ _id: habit._id }}>
			{(unStarHabit, { data, loading, error }) => {
				if (loading) return null;
				return (
					<Mutation mutation={STAR_HABIT} variables={{ _id: habit._id }}>
						{(starHabit, { data, loading, error }) => {
							if (loading) return null;
							return (
								<Label
									as="a"
									onClick={() => handleClick(starHabit, unStarHabit)}
									color="purple"
									ribbon="right">
									<Icon
										name={stared ? "star" : "star outline"}
										color={stared ? "yellow" : "black"}
									/>{" "}
									{starLength}
									{stared ? "お気に入りの解除" : "お気に入りに追加"}
								</Label>
							);
						}}
					</Mutation>
				);
			}}
		</Mutation>
	);
};

export default StarLabel;
