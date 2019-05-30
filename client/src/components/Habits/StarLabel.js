import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../";

import { Label, Icon } from "semantic-ui-react";
import "./Habits.css";
import { Mutation } from "react-apollo";
import { STAR_HABIT } from "./../../queries/index";
import Loader from "../shered/Loader";

const StarLabel = ({ habit }) => {
	const [stared, setStar] = useState(false);
	const [starLength, setStarLength] = useState(habit.starUser.length);
	const currentUser = useContext(UserContext);
	useEffect(() => {
		if (currentUser) {
			currentUser.favorites.forEach(({ _id }) => {
				if (habit._id === _id) setStar(true);
			});
		}
	}, []);

	const handleClick = starHabit => {
		starHabit().then(({ data }) => {
			console.log(data);
			setStar(!stared);
			setStarLength(data.starHabit.starUser.length);
		});
	};

	const updateStar = (cache, { data }) => {
		console.log(cache);
		// const {getAllHabits}=cache.readQuery({

		// })
	};

	return (
		<Mutation
			mutation={STAR_HABIT}
			variables={{ _id: habit._id }}
			update={updateStar}>
			{(starHabit, { data, loading, error }) => {
				if (loading) return <Loader />;
				return (
					<Label
						as="a"
						onClick={() => handleClick(starHabit)}
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
};

export default StarLabel;
