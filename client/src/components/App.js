import React, { useContext, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import Habits from "./Habits/Habits";
import Profile from "./Profile/Profile";
import HabitDescription from "./Habits/HabitsDescription/HabitDescription";
import Layout from "./Layout/Layout";
import CreateHabit from "./Habits/CreateHabit";
import MyHabits from "./Habits/MyHabits";
import FavoriteHabits from "./Habits/FavoriteHabits";
import { UserContext } from "./../index";

export const App = ({ refetch }) => {
	const currentUser = useContext(UserContext);

	return (
		<Fragment>
			<Switch>
				<Route exact path="/" component={Homepage} />
			</Switch>
			<Route
				path="/(.+)"
				render={() => (
					<div>
						<Layout>
							<Switch>
								<Route
									path="/signup"
									render={() => <Signup refetch={refetch} />}
								/>
								<Route
									path="/signin"
									render={() => <Signin refetch={refetch} />}
								/>
								<Route
									path="/habits"
									render={() => <Habits refetch={refetch} />}
								/>
								<Route path="/habit/:_id" component={HabitDescription} />
								{currentUser && (
									<Fragment>
										<Route path="/newhabit" component={CreateHabit} />
										<Route path="/myhabits" component={MyHabits} />
										<Route path="/favorites" component={FavoriteHabits} />
										<Route path="/profile" component={Profile} />
									</Fragment>
								)}

								<Redirect to="/habits" />
							</Switch>
						</Layout>
					</div>
				)}
			/>
		</Fragment>
	);
};

export default App;
