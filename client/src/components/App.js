import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
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
									<Route path="/signup" component={Signup} />
									<Route path="/signin" component={Signin} />
									<Route path="/habit/:id" component={HabitDescription} />
									<Route path="/habits" component={Habits} />
									<Route path="/profile" component={Profile} />
									<Redirect to="/habits" />
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
