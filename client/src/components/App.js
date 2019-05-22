import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import signin from "./Auth/signin";
import signup from "./Auth/signup";
import Habits from "./Habits/Habits";
import Profile from "./Profile/Profile";
import HabitDescription from "./Habits/HabitDescription";
import { Layout } from "./Layout/Layout";

export class App extends Component {
	render() {
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
									<Route path="/signup" component={signup} />
									<Route path="/signin" component={signin} />
									<Route path="/habit/:id" component={HabitDescription} />
									<Route path="/habits" component={Habits} />
									<Route path="/profile/:id" component={Profile} />
									<Redirect to="habits" />
								</Switch>
							</Layout>
						</div>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
